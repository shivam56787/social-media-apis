const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("MongoDatabase Connected Successfully");
});
