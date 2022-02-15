const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  authorId: {
    type: String,
    required: "Enter Author ID",
  },
  postId: {
    type: String,
    required: "Enter Post ID",
  },
  post: {
    type: String,
    required: "Enter post",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("post", postSchema, "post");
