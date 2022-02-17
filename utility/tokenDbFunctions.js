const { Token } = require("../database/models");

class TokenDbFunctions {
  async insertToken(data) {
    await Token.create(data, function (err) {
      if (err) console.log(err);
    });
  }
  async findToken(condition) {
    const token = await Token.findOne(condition);
    if (!token) return false;
    return true;
  }
  async deleteToken(data) {
    return await Token.findOneAndDelete(data);
  }
}
module.exports = TokenDbFunctions;
