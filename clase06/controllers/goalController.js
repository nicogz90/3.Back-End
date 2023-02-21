const mongoose = require("mongoose");
const Team = require("../models/Team");
const Goal = require("../models/Goal");

module.exports = {
  index: async (req, res) => {
    const goals = await Goal.find({})
      .populate("teamFor", "name") // popula solo con "name"
      .populate("teamAgainst", "name")
      .lean(); // Para mejorar la performance. Cuando esta opción es true en lugar de retornar un documento de Mongoose, lo convierte a objeto de JavaScript >> queda menos pesado, pero se pierden funcionalidades de Mongoose, como por ejemplo .save()
    res.json(goals);
  },

  store: async (req, res) => {
    try {
      /**
       * Este código tiene un problema y es que se están haciendo
       * tres (3) llamadas a la base de datos. Si una (1) de ellas falla,
       * quedarían datos inconsistentes en la BD.
       * Para evitar este problema, se puedem usar TRANSACCIONES:
       * https://thecodebarbarian.com/whats-new-in-mongoose-5-10-improved-transactions.html
       */

      // console.log("req.body >>> ", req.body);
      const teamForPromise = Team.findOne({ code: req.body.teamFor }); // con .find no funciona ya que devuelve un array de objetos, y precisamos un objeto
      // console.log("teamFor >>> ", teamFor);
      const teamAgainstPromise = Team.findOne({ code: req.body.teamAgainst });
      // console.log("teamAgainst >>> ", teamAgainst);

      // Resolvemos todas las promesas de manera concurrente, en lugar de esperarlas una a la vez (es más eficiente):
      const [teamFor, teamAgainst] = await Promise.all([
        teamForPromise,
        teamAgainstPromise,
      ]);

      const newGoal = await Goal.create({
        player: req.body.player,
        minute: req.body.minute,
        teamFor: teamFor,
        teamAgainst: teamAgainst,
      }); // no funciona con .create(req.body)
      // console.log("newGoal >>> ", newGoal);

      teamFor.goalsScored.push(newGoal._id);
      teamFor.save();
      teamAgainst.goalsConceded.push(newGoal._id);
      teamAgainst.save();

      res.status(201).json(newGoal);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error);
      } else {
        console.log(error);
        res.status(500).json({
          error: "Error inesperado con la base de datos.",
        });
      }
    }
  },

  update: async (req, res) => {
    try {
      const goal = await Goal.findByIdAndUpdate(
        req.params.id,
        {
          player: req.body.player,
          minute: req.body.minute,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!goal) {
        return res.status(404).json({
          error: "El gol que se quiere editar no existe.",
        });
      }
      return res.json(goal);
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
      const goal = await Goal.findByIdAndDelete(req.params.id)
        .populate("teamFor")
        .populate("teamAgainst");
      if (!goal) {
        return res.status(404).json({
          error: "El gol que se quiere eliminar no existe.",
        });
      }

      // destruyo relaciones con los teams (goal.teamFor) y (goal.teamAgainst):
      goal.teamFor.goalsScored.pull(goal._id); // disponible gracias a populate
      goal.teamFor.save();
      goal.teamAgainst.goalsConceded.pull(goal._id); // disponible gracias a populate
      goal.teamAgainst.save();

      /**
       * Mejor alternativa con UPDATE OPERATORS:
       *   await Team.findByIdAndUpdate(goal.teamFor._id, {
       *     $pull: { goalsScored: goal._id },
       *   });
       *   await Team.findByIdAndUpdate(goal.teamAgainst._id, {
       *     $pull: { goalsConceded: goal._id },
       *   });
       */

      return res.json(goal);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error inesperado con la base de datos.",
      });
    }
  },
};
