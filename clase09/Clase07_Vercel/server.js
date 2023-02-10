const express = require("express");
const cors = require('cors')
const app = express();
const routes = require("./routes");

app.use(cors())

require("./db")();

app.use(express.json());

routes(app);

module.exports = app;

