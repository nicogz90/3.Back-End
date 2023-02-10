const mongoose = require("mongoose");
const Team = require("../models/Team");

const index = async (req, res) => {
  const order = req.query.order || "asc";
  const sortBy = req.query.sortBy || "code";
  const skip = Number(req.query.skip);
  const sortCriteria = {
    [sortBy]: order, // creamos una key en el objecto usando el valor de sortBy
  };
  const teams = await Team.find({}).sort(sortCriteria).skip(skip);
  res.json(teams);
};

const show = async (req, res) => {
  const team = await Team.findOne({ code: req.params.code });
  if (!team) {
    return res.status(404).json({
      error: "El equipo no existe.",
    });
  }
  res.json(team);
};

const store = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body); // OJO: Esto puede ser peligroso debido al "Mass Assignment".
    return res.status(201).json(newTeam);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        error: "Ocurrió un error al guardar el equipo.",
      });
    }
  }
};

const update = async (req, res) => {
  // Se implementará próximamente...
};

const destroy = async (req, res) => {
  // Se implementará próximamente...
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
