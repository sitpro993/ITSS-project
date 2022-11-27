const jwt = require("jsonwebtoken");

const createToken = (payload, secretSignature, tokenLife) => {
  return jwt.sign(payload, secretSignature, {
    algorithm: "HS256",
    expiresIn: tokenLife,
  });
};

module.exports = createToken;
