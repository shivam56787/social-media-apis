const { validationResult } = require("express-validator");
const preconditionHandler = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(412).json({ errors: errors.array() });
  }
  return next();
};
module.exports = { preconditionHandler };
