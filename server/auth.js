const jwt = require("jsonwebtoken");
const Users = require("./models/userModel.js");

const auth = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });

  console.log(token)
  const decoded = jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });

  const user = await Users.findOne({ _id: decoded.id });

  return { id: user._id };
};

module.exports = auth;
