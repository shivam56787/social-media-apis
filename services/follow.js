const { UserDbFunctions, FollowDbFunctions } = require("../utility");

class FollowService {
  constructor() {
    this.userDbFunctions = new UserDbFunctions();
    this.followDbFunctions = new FollowDbFunctions();
  }

  async followUser(req, res) {
    try {
      const followerId = req.user.userId;
      const followingId = req.params.id;
      const follower = req.user;
      const following = await this.userDbFunctions.findUser({
        userId: followingId,
      });
      const already_follows = await this.verifyFollower(follower, following, res);
      if (!already_follows) {
        await this.followDbFunctions.createFollow({
          followerId: followerId,
          followingId: followingId,
        });
      } else if (!already_follows.following) {
        await this.followDbFunctions.updateFollow(
          {
            followerId: followerId,
            followingId: followingId,
          },
          { following: true }
        );
      } else {
        return res.status(200).send({ message: "Already following" });
      }

      return res.status(200).send({ message: "User followed successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async unfollowUser(req, res) {
    try {
      const followerId = req.user.userId;
      const followingId = req.params.id;
      const follower = req.user;
      const following = await this.userDbFunctions.findUser({
        userId: followingId,
      });
      const already_follows = await this.verifyFollower(follower, following, res);
      if ("following" in already_follows && already_follows.following) {
        await this.followDbFunctions.updateFollow(
          {
            followerId: followerId,
            followingId: followingId,
          },
          { following: false }
        );
      } else {
        return res.status(200).send({ message: "Already unfollowed" });
      }
      return res.status(200).send({ message: "User unfollowed successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async verifyFollower(follower, following, res) {
    if (!follower || !following) return res.status(404).send({ message: "User Not Found" });
    else
      return await this.followDbFunctions.findFollow({
        followerId: follower.userId,
        followingId: following.userId,
      });
  }
}

module.exports = FollowService;
