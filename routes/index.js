const { authenticate } = require("../middleware/authentication_middleware");
const { preconditionHandler } = require("../middleware/preconditionHandler");
const {
  createUser,
  validateParamsUUID,
  authenticateUser,
  validatePost,
} = require("../middleware/validation");
const { UserService, PostService } = require("../services/index");
class AllRoutes {
  loadRoutes(app) {
    app.post(
      "/signup",
      createUser,
      preconditionHandler,
      async function (req, res) {
        await new UserService().createUser(req.body, res);
      }
    );

    app.post(
      "/authenticate",
      authenticateUser,
      preconditionHandler,
      async function (req, res) {
        await new UserService().authenticateUser(req.body, res);
      }
    );

    app.post(
      "/follow/:id",
      validateParamsUUID,
      preconditionHandler,
      authenticate,
      async function (req, res) {
        await new UserService().followUser(req, res);
      }
    );

    app.post(
      "/unfollow/:id",
      validateParamsUUID,
      preconditionHandler,
      authenticate,
      async function (req, res) {
        await new UserService().unfollowUser(req, res);
      }
    );

    app.post(
      "/post",
      validatePost,
      preconditionHandler,
      authenticate,
      async function (req, res) {
        await new PostService().createPost(req, res);
      }
    );

    app.delete(
      "/post/:id",
      validateParamsUUID,
      preconditionHandler,
      authenticate,
      async function (req, res) {
        await new PostService().deletePost(req, res);
      }
    );

    app.get(
      "/post/:id",
      validateParamsUUID,
      preconditionHandler,
      authenticate,
      async function (req, res) {
        await new PostService().getPost(req, res);
      }
    );

    app.get(
      "/feed/:id",
      validateParamsUUID,
      preconditionHandler,
      authenticate,
      async function (req, res) {
        await new PostService().getPost(req, res);
      }
    );
  }
}
module.exports = AllRoutes;
