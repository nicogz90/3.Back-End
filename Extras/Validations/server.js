require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;
const routes = require("./routes");


app.use(express.json())
app.use(routes);

// Express permite crear un middleware para atrapar errores 
app.use((err, req, res, next) => {
  // Verificamos si el error es de tipo Joi
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else {
    // Si no es de tipo Joi pasamos el error al next middleware (en este caso no hay)
    next(err);
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
