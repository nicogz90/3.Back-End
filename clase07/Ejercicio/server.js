const express = require("express");
const app = express();

const routes = require("./routes");
require("./db")();

app.use(express.json());

routes(app);

module.exports = app;
