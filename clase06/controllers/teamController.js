const mongoose = require("mongoose");
const Team = require("../models/Team");

module.exports = {
  index: async (req, res) => {
    const order = req.query.order || "asc";
    const sortBy = req.query.sortBy || "code";
    const skip = Number(req.query.skip);
    const sortCriteria = {
      [sortBy]: order,
    };
    const teams = await Team.find({}).sort(sortCriteria).skip(skip);
    res.json(teams);
  },

  show: async (req, res) => {
    try {
      const team = await Team.findOne({ code: req.params.code })
        .populate("goalsScored")
        .populate("goalsConceded");
      if (!team) {
        return res.status(404).json({
          error: "El equipo no existe.",
        });
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  store: async (req, res) => {
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
  },

  update: async (req, res) => {
    try {
      const team = await Team.findOneAndUpdate(
        { code: req.params.code },
        req.body,
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
  },

  destroy: async (req, res) => {
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
  },

  incrementGoals: async (req, res) => {
    const team = await Team.findOneAndUpdate(
      { code: req.params.code },
      { $inc: { goals: 1 } },
      { new: true }
    );
    if (!team) {
      return res.status(400).json({
        error: "La operación no es válida.",
      });
    }
    res.json(team);
  },

  decrementGoals: async (req, res) => {
    const team = await Team.findOneAndUpdate(
      {
        code: req.params.code,
        goals: { $gte: 1 },
      },
      { $inc: { goals: -1 } },
      { new: true }
    );
    if (!team) {
      return res.status(400).json({
        error: "La operación no es válida.",
      });
    }
    res.json(team);
  },
};
