const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

const port = process.env.PORT || 3000;

const dbConnectionString =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost/proyectoFinal";

module.exports = {
  jwtSecret,
  port,
  dbConnectionString,
};
