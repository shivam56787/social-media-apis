const { Follow } = require("../database/models");

class FollowDbFunctions {
  async findFollow(condition) {
    const follow = await Follow.findOne(condition);
    return follow;
  }
  async findAll(condition) {
    const follow = await Follow.find(condition);
    return follow;
  }

  async createFollow(data) {
    const result = await Follow.create(data);
    return result;
  }

  async updateFollow(condition, data) {
    const result = await Follow.findOneAndUpdate(condition, data);
    return result;
  }
}

module.exports = FollowDbFunctions;
