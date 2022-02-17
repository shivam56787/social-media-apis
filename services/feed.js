const { FollowDbFunctions, PostDbFunctions } = require("../utility");

class FollowService {
  constructor() {
    this.followDbFunctions = new FollowDbFunctions();
    this.postDbFunctions = new PostDbFunctions();
  }

  async getFeed(req, res) {
    try {
      const followings = await this.followDbFunctions.findAll({ followerId: req.user.userId, following: true });

      const arr = followings.reduce((authorArr, obj) => {
        authorArr.push(obj.followingId);
        return authorArr;
      }, []);

      let result = await this.postDbFunctions.findAllPost({ authorId: { $in: arr }, isDeleted: false });
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}
module.exports = FollowService;
