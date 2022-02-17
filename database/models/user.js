const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: "Enter ID",
  },
  userName: {
    type: String,
    unique: true,
    required: "Enter username",
  },
  userPassword: {
    type: String,
    required: "Password is required",
  },
  firstName: {
    type: String,
    required: "First Name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  emailId: {
    type: String,
    unique: true,
    required: "Email ID is required",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "DELETED"],
  },
});

userSchema.index({ emailId: 1 });

module.exports = mongoose.model("user", userSchema, "user");
