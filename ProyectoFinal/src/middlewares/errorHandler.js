function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    // Atrapamos los errores de validacion de Mongoose
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ errors });
  }

  const status = err.status || 500;

  let message = "";
  // Si el error no es ValidationError, mostramos el error

  if (status === 500) {
    console.error(err);
    message = "Internal server error";
  } else {
    message = err.message || "Algo salio mal";
  }

  res.status(status).json({
    message,
  });
}

module.exports = errorHandler;
