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
  console.log(teams);
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
    const newTeam = await Team.create(req.body); // OJO: Esto puede ser peligroso debido al "Mass Assignment". Por ejemplo si nos pasan un array muy grande por el req.body
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
    return res.status(200).json(team); // no es necesario el ".status(200)" ya que es el status por defecto
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        error: "Internal Server Error",
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
      error: "Internal Server Error",
    });
  }
};

const incrementGoals = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      { code: req.params.code },
      { $inc: { goals: 1 } }, // Update Operators: modificadores para usar en operaciones de actualización. de forma eficiente y segura (atómica >> transacciones)
      // con esta opción nos aseguramos que el findOneAndUpdate nos devuelve la version nueva del documento :D
      { new: true }
    );
    if (!team) {
      return res.status(404).json({
        error: "Equipo no encontrado",
      });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const decrementGoals = async (req, res) => {
  try {
    const team = await Team.findOneAndUpdate(
      {
        code: req.params.code,
        // Vamos a actualizar solo si al menos tiene 1 gol. No queremos que quede con goles negativos
        goals: { $gte: 1 },
      },
      { $inc: { goals: -1 } },
      // con esta opción nos aseguramos que el findOneAndUpdate nos devuelve la version nueva del documento :D
      { new: true }
    );

    if (!team) {
      return res.status(400).json({
        error: "La operación no es válida.",
      });
    }
    res.json(team);
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
