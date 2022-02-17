const jwt = require("jsonwebtoken");
const { TokenDbFunctions, UserDbFunctions } = require("../utility");
const authenticate = async function (req, res, next) {
  const token = req.headers["authorization"] || req.header["authorization"];

  if (token) {
    try {
      const tokenDbFunctions = new TokenDbFunctions();
      const userDbFunctions = new UserDbFunctions();
      const jwtData = jwt.verify(token, process.env.JWTSECRET);
      const tokenFound = await tokenDbFunctions.findToken({ token: token });
      if (!tokenFound) return res.status(401).send({ message: "Login Again" });
      const user = await userDbFunctions.findUser({
        userId: jwtData.userId,
      });
      if (!user) return res.status(404).send({ message: "User Not Found" });
      req.user = user;
      return next();
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
  return res.status(400).send({ message: "Token Not Found" });
};
module.exports = { authenticate };
