const mongoose = require("mongoose");
const teamSeeder = require("./teamSeeder");

module.exports = async () => {
  // Seeders:
  await mongoose.connection.dropDatabase();
  await teamSeeder();
};
