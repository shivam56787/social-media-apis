const mongoose = require("mongoose");

let followSchema = mongoose.Schema({
  followerId: {
    type: String,
    required: "Enter Author ID",
  },
  followingId: {
    type: String,
    required: "Enter Post ID",
  },
  following: {
    type: Boolean,
    default: true,
  },
});
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
module.exports = mongoose.model("follow", followSchema, "follow");
