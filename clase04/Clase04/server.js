require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoConnection = require("./db");

const app = express();
const PORT = process.env.APP_PORT || 3000;

mongoConnection();

app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
