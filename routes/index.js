const { authenticate } = require("../middleware/authentication_middleware");
const { preconditionHandler } = require("../middleware/preconditionHandler");
const { createUser, validateParamsUUID, authenticateUser, validatePost } = require("../middleware/validation");
const { UserService, PostService, FollowService, FeedService } = require("../services/index");
class AllRoutes {
  loadRoutes(app) {
    app.post("/signup", createUser, preconditionHandler, async function (req, res) {
      await new UserService().signUp(req.body, res);
    });

    app.post("/login", authenticateUser, preconditionHandler, async function (req, res) {
      await new UserService().login(req.body, res);
    });
    app.get("/logout", authenticate, async function (req, res) {
      await new UserService().logout(req, res);
    });

    app.post("/follow/:id", validateParamsUUID, preconditionHandler, authenticate, async function (req, res) {
      await new FollowService().followUser(req, res);
    });

    app.post("/unfollow/:id", validateParamsUUID, preconditionHandler, authenticate, async function (req, res) {
      await new FollowService().unfollowUser(req, res);
    });

    app.post("/post", validatePost, preconditionHandler, authenticate, async function (req, res) {
      await new PostService().createPost(req, res);
    });

    app.delete("/post/:id", validateParamsUUID, preconditionHandler, authenticate, async function (req, res) {
      await new PostService().deletePost(req, res);
    });

    app.get("/feed", authenticate, async function (req, res) {
      await new FeedService().getFeed(req, res);
    });
  }
}
module.exports = AllRoutes;
