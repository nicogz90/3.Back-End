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
  try {
    const team = await Team.findOne({ code: req.params.code });
    if (!team) {
      return res.status(404).json({
        error: "El equipo no existe.",
      });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const store = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body); // OJO: Esto puede ser peligroso debido al "Mass Assignment".
    return res.status(200).json(newTeam);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        error: "Ocurrió un error inesperado al guardar el equipo.",
      });
    }
  }
};

const update = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true, runValidators: true }
    );
    if (team) {
      return res.status(200).json(team); // no es necesario el ".status(200)" ya que es el status por defecto
    } else {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidatorError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const destroy = async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ code: req.params.code });
    if (!team) {
      return res
        .status(404)
        .json({ error: "El equipo que se quiere eliminar no existe" });
    }
    return res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const incrementGoals = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { code: req.params.code },
      { $inc: { goals: 1 } },
      { new: true } // nos aseguramos que el findOneAndUpdate nos devuelva la version nueva del documento
    );
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: "Equipo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const decrementGoals = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { code: req.params.code, goals: { $gte: 1 } },
      { $inc: { goals: -1 } },
      { new: true }
    );
    team.goals--;
    if (team) {
      res.json(team);
    } else {
      res.status(404).json({ error: "La operación no es válida" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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
