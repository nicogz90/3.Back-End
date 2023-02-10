require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const connect = require("./db"); // conexión con base de datos

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
