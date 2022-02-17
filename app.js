const express = require("express");
require("dotenv").config();
require("./database");
const bodyParser = require("body-parser");

const AllRoutes = require("./routes/index");
const all_routes = new AllRoutes();
const router = express.Router({ mergeParams: true });
all_routes.loadRoutes(router);

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
