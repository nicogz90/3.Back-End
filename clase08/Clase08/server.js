require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;
const routes = require("./routes");
const registerWebsocket = require("./socket");
const db = require("./db");

db()

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(routes);

const server = app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}!`)
);

registerWebsocket(server);
