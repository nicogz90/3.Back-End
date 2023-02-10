const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  code: String,
  name: String,
  flag: String,
});

const Team = mongoose.model("teams", teamSchema);

module.exports = Team;

//! Este codigo no deberia estar en el modelo, pero por ahora lo dejamos para cumplir con el ejercicio

// Se crea Uruguay:
const team = new Team({
  code: "uy",
  name: "Uruguay",
  flag: "uy",
});

team
  .save()
  .then(() => {
    console.log("Se guardó un equipo en la base de datos");
  })
  .catch((error) => console.log(error));
