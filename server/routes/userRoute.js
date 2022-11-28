const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel.js");
const createToken = require("../utils/generateToken.js");
const auth = require("../auth.js");

const userRouter = express.Router();

const userAcessToken = process.env.USER_ACCESS_TOKEN_SECRET;
const userRefreshToken = process.env.USER_REFRESH_TOKEN_SECRET;

// api/users/accessToken
userRouter.get("/accessToken", async (req, res) => {
  try {
    const rf_token = req.headers.authorization;

    if (!rf_token) return res.status(400).json({ err: "Please login now!" });

    const result = jwt.verify(rf_token, userRefreshToken);

    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exist." });

    const access_token = createToken({ id: user._id }, userAcessToken, "30d");
    res.json({
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/users/signin
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: "Tài khoản không tồn tại.", errCode: 1 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ err: "Mật khẩu không đúng.", errCode: 2 });

    const access_token = createToken({ id: user._id }, userAcessToken, "30d");
    const refresh_token = createToken(
      { id: user._id },
      userRefreshToken,
      "365d"
    );

    res.json({
      msg: "Chào, " + user.firstName + " quay trở lại",
      refresh_token,
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/users/register
userRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ err: "Email đã tồn tại." });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.json({
      msg: "Đăng ký thành công",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/users/profile/changePassword
userRouter.patch("/profile/changePassword", async (req, res) => {
  try {
    const result = await auth(req, res);
    const { password, newPassword } = req.body;
    if (result.id) {
      const user = await Users.findById(result.id);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const passwordHash = await bcrypt.hash(newPassword, 12);
          const user = await Users.findByIdAndUpdate(
            result.id,
            { password: passwordHash },
            {
              new: true,
            }
          );
          res.json({ msg: "Đổi mật khẩu thành công" });
        } else {
          res.json({ err: "Sai mật khẩu cũ" });
        }
      } else {
        res.json({ err: "Tài khoản không tồn tại" });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/users/profile/edit
userRouter.patch("/profile/edit", async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const user = await Users.findByIdAndUpdate(
        result.id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
        },
        {
          new: true,
        }
      );

      res.json({
        msg: "Thay đổi thành công",
        user: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
        },
      }); //
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/users/profile
userRouter.get("/profile", async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const user = await Users.findById(result.id).select([
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
      ]);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: "Không tồn tại tài khoản" });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/users/

module.exports = userRouter;
