const jwt = require("jsonwebtoken");
const authenticate = async function (req, res, next) {
  const token = req.headers["authorization"] || req.header["authorization"];

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWTSECRET);
      req.user = user;
      return next();
    } catch (err) {
      return res.status(403).send({ message: "Invalid Token" });
    }
  }
  return res.status(400).send({ message: "Token Not Found" });
};
module.exports = { authenticate };
