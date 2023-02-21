require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;

const routes = require("./routes");

const mongoConnection = require("./db");
mongoConnection();

app.use(express.json()); // el middleware para poder leer json va ANTES que las rutas
app.use(routes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
