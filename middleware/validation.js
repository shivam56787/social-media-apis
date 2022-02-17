const { body, param, oneOf } = require("express-validator");

const createUser = [
  body("firstName").exists().withMessage("First Name Required").isString().withMessage("Not a String"),
  body("lastName").exists().withMessage("Last Name Required").isString().withMessage("Not a String"),
  body("userName").exists().withMessage("User Name Required").isString().withMessage("Not a String"),
  body("emailId").exists().withMessage("Email id Required").isEmail().withMessage("Not a Email"),
  body("userPassword").exists().withMessage("Password Required"),
];

const authenticateUser = [
  oneOf([
    body("userName")
      .exists()
      .withMessage("User Name or Email id Required")
      .isString()
      .withMessage("userName not a String"),
    body("emailId").exists().withMessage("User Name or Email id Required").isEmail().withMessage("Not a Email"),
  ]),

  body("userPassword").exists().withMessage("Password Required"),
];

const validateParamsUUID = [
  param("id").exists().withMessage("id Required").isUUID().withMessage("Not a valid UUID"),
];

const validatePost = [body("post").exists().withMessage("Post Required").isString().withMessage("Not a String")];

module.exports = {
  createUser,
  authenticateUser,
  validateParamsUUID,
  validatePost,
};
