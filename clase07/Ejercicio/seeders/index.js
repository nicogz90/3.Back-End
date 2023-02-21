const mongoose = require("mongoose");
const userSeeder = require("./userSeeder");

module.exports = async () => {
  // Seeders:
  if (process.env.DEV) {
    // para usar en desarrollo (en produccion uso la ruta de VERCEL por ejemplo, con la variable DEV en false)
    await mongoose.connection.dropDatabase();
    await userSeeder();
  }
};
