const { body, param } = require("express-validator");

const createUser = [
  body("first_name")
    .exists()
    .withMessage("First Name Required")
    .isString()
    .withMessage("Not a String"),
  body("last_name")
    .exists()
    .withMessage("Last Name Required")
    .isString()
    .withMessage("Not a String"),
  body("email_id")
    .exists()
    .withMessage("Email id Required")
    .isEmail()
    .withMessage("Not a Email"),
  body("password").exists().withMessage("Password Required"),
];

const authenticateUser = [
  body("email_id")
    .exists()
    .withMessage("Email id Required")
    .isEmail()
    .withMessage("Not a Email"),
  body("password").exists().withMessage("Password Required"),
];

const validateParamsUUID = [
  param("id")
    .exists()
    .withMessage("id Required")
    .isUUID()
    .withMessage("Not a valid UUID"),
];

const validatePost = [
  body("post")
    .exists()
    .withMessage("Post Required")
    .isString()
    .withMessage("Not a String"),
];

module.exports = {
  createUser,
  authenticateUser,
  validateParamsUUID,
  validatePost,
};
