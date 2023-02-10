const mongoose = require("mongoose");
const Team = require("../models/Team");

const index = async (req, res) => {
  const order = req.query.order || "asc";
  const sortBy = req.query.sortBy || "code";
  const skip = Number(req.query.skip);
  const sortCriteria = {
    [sortBy]: order,
  };
  const teams = await Team.find({}).sort(sortCriteria).skip(skip);
  res.json(teams);
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
        error: "Error inesperado con la base de datos.",
      });
    }
  }
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

const update = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      // con estas opciones nos aseguramos que el findOneAndUpdate nos devuelve la version nueva del documento :D
      { new: true, runValidators: true }
    );
    if (!team) {
      return res.status(404).json({
        error: "El equipo que se quiere editar no existe.",
      });
    }
    return res.json(team);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        error: "Error inesperado con la base de datos.",
      });
    }
  }
};

const destroy = async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ code: req.params.code });
    if (!team) {
      return res.status(404).json({
        error: "El equipo que se quiere eliminar no existe.",
      });
    }
    return res.json(team);
  } catch (error) {
    res.status(500).json({
      error: "Error inesperado con la base de datos.",
    });
  }
};

const incrementGoals = async (req, res) => {
  const team = await Team.findOneAndUpdate(
    { code: req.params.code },
    { $inc: { goals: 1 } },

    // con estas opciones nos aseguramos que el findOneAndUpdate nos devuelve la version nueva del documento :D
    { new: true }
  );
  if (!team) {
    return res.status(400).json({
      error: "La operación no es válida.",
    });
  }
  res.json(team);
};

const decrementGoals = async (req, res) => {
  const team = await Team.findOneAndUpdate(
    {
      code: req.params.code,
      // Vamos a actualizar solo si al menos tiene 1 gol. No queremos que quede con goles negativos
      goals: { $gte: 1 },
    },
    // con estas opciones nos aseguramos que el findOneAndUpdate nos devuelve la version nueva del documento :D
    { $inc: { goals: -1 } },
    { new: true }
  );
  if (!team) {
    return res.status(400).json({
      error: "La operación no es válida.",
    });
  }
  res.json(team);
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  incrementGoals,
  decrementGoals,
};
