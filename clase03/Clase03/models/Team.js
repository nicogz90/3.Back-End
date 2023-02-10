const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    code: String,
    name: String,
    flag: String,
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

//! Este codigo no deberia estar en el modelo, pero por ahora lo dejamos para cumplir con el ejercicio

// Se crea Uruguay:
const team = new Team({
  code: "uy",
  name: "Uruguay",
  flag: "🇺🇾",
});

team
  .save()
  .then((team) => {
    console.log("Se ha creado el equipo: ", team);
  })
  .catch((err) => {
    console.log("Error al crear el equipo: ", err);
  });
