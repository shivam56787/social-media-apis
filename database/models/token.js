const mongoose = require("mongoose");

let tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: "Enter token",
  },
});
module.exports = mongoose.model("token", tokenSchema, "token");
