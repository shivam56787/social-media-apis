const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserDbFunctions, TokenDbFunctions } = require("../utility");
class UserService {
  constructor() {
    this.userDbFunctions = new UserDbFunctions();
    this.tokenDbFunctions = new TokenDbFunctions();
  }

  async signUp(data, res) {
    let uuid = uuidv4();
    try {
      const user = await this.userDbFunctions.findUser({
        emailId: data.emailId,
      });
      if (user) return res.status(409).send({ message: "Already a User" });
      data.userId = uuid;
      const salt = Number(process.env.SALT);
      data.userPassword = bcrypt.hashSync(data.userPassword, salt);
      data.status = "ACTIVE";
      await this.userDbFunctions.createUser(data);
      return res.status(200).send({ message: "User Created" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async login(data, res) {
    try {
      const emailId = data.emailId;
      const userName = data.userName;
      let user;
      if (emailId) user = await this.userDbFunctions.findUser({ emailId: emailId });
      else if (userName) user = await this.userDbFunctions.findUser({ userName: userName });

      if (!user) return res.status(401).send({ message: "Unauthorized User" });

      const password = bcrypt.compareSync(data.userPassword, user.userPassword);

      if (!password) return res.status(401).send({ message: "Unauthorized User/Password" });

      const token = jwt.sign(
        { userId: user.userId, email: user.emailId, userName: user.userName },
        process.env.JWTSECRET,
        { expiresIn: "365d" }
      );
      await this.tokenDbFunctions.insertToken({ token: token });
      console.log("Token Generated");
      return res.status(200).send({ token: token });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers["authorization"] || req.header["authorization"];
      if (token) {
        await this.tokenDbFunctions.deleteToken({
          token: token,
        });
        return res.status(200).send({ message: "logged out" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

module.exports = UserService;
