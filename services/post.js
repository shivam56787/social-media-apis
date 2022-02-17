const { v4: uuidv4 } = require("uuid");
const { PostDbFunctions, UserDbFunctions } = require("../utility");
class PostService {
  constructor() {
    this.postDbFunctions = new PostDbFunctions();
    this.userDbFunctions = new UserDbFunctions();
  }

  async createPost(req, res) {
    try {
      const uuid = uuidv4();
      let post = {};
      post.postId = uuid;
      post.authorId = req.user.userId;
      post.post = req.body.post;
      let result = await this.postDbFunctions.createPost(post);
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async deletePost(req, res) {
    try {
      const post = await this.postDbFunctions.findPost({
        postId: req.params.id,
      });
      if (!post || post.isDeleted) return res.status(404).send({ message: "Post Not Found" });
      if (req.user.userId != post.authorId) {
        return res.status(401).send({ message: "Unauthorized" });
      } else {
        this.postDbFunctions.updatePost({ postId: post.postId }, { isDeleted: true, updatedAt: new Date() });
      }

      return res.status(200).send({ message: "Post Deleted" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}

module.exports = PostService;
