const { Post } = require("../database/models");

class PostDbFunctions {
  async createPost(data) {
    const result = await Post.create(data);
    return result;
  }

  async findAllPost(condition) {
    const follow = await Post.find(condition).sort({ updatedAt: -1 });
    return follow;
  }

  async updatePost(condition, data) {
    await Post.findOneAndUpdate(condition, data);
  }
}

module.exports = PostDbFunctions;
