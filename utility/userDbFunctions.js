const { User } = require("../database/models");

class UserDbFunctions {
  async findUser(condition) {
    const user = await User.findOne(condition);
    return user;
  }

  async createUser(data) {
    await User.create(data);
  }
}

module.exports = UserDbFunctions;
