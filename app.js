const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./database");
const AllRoutes = require("./routes/index");
const all_routes = new AllRoutes();
const router = express.Router({ mergeParams: true });
all_routes.loadRoutes(router);
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
