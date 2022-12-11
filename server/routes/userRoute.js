const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel.js");
const Company = require("../models/companyModel.js");
const Students = require("../models/studentModel.js");
const createToken = require("../utils/generateToken.js");
const auth = require("../auth.js");

const userRouter = express.Router();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// api/users/accessToken
userRouter.get("/accessToken", async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) return res.status(400).json({ err: "Please login now!" });

    const result = jwt.verify(token, accessTokenSecret);

    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exist." });

    
    let userInfo;

    if (user.role === "company") {
      userInfo = await Company.findOne({ company_id: user._id });
      if(userInfo){}
    }

    if (user.role === "student") {
      userInfo = await Students.findOne({ userId: user._id });
    }

    res.json({
    
      ...userInfo._doc, email: user.email, role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/users/login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ err: "User does not exist.", errCode: 1 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ err: "Password not true.", errCode: 2 });

    const access_token = createToken({ id: user._id }, accessTokenSecret, "30d");

    res.json({
      access_token,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/users/register
userRouter.post("/register", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ err: "Email đã tồn tại." });

    const passwordHash = await bcrypt.hash(req.body.password, 12);

    const newUser = new Users({
      email: req.body.email,
      password: passwordHash,
      role: req.body.role,
    });
    const data = await newUser.save();

    if (req.body.role === "student") {
      const newStudent = new Students({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: data._id,
      });
      await newStudent.save();
    }
    if (req.body.role === "company") {
      const newCompany = new Company({
        full_name: req.body.fullName,
        short_name: req.body.shortName,
        user_id: data._id,
      });
      await newCompany.save();
    }

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
