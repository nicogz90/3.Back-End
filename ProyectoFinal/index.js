require("dotenv").config();
const express = require("express");
const app = express();
require("./db")();

const routes = require("./routes");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(routes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
