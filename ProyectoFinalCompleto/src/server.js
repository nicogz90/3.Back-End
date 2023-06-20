require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require("./db");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

db();

app.use(logger);

// toma el json que viene en el body y lo coloca en req.body
app.use(express.json());

// para formularios html (sin JavaScript)
app.use(express.urlencoded({ extended: true }));

// permitir acceso a nuestro servidor desde otros orígenes (direcciones url)
app.use(cors());

app.use(routes);

app.use(errorHandler);

module.exports = app;
