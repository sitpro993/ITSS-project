const jwt = require("jsonwebtoken");
const Users = require("./models/userModel.js");

const auth = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });

  const user = await Users.findOne({ _id: decoded.id });
  if (!user)
    return res.status(400).json({ err: "User does not exist."});

  return { id: user._id, role: user.role };
};

module.exports = auth;
