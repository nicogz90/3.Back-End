const mongoose = require("mongoose");
const Goal = require("../models/Goal");
const Team = require("../models/Team");

const index = async (req, res) => {
  const goals = await Goal.find({})
    .populate("teamFor", "name")
    .populate("teamAgainst", "name");
  res.json(goals);
};

const store = async (req, res) => {
  try {
    /* console.log("req.body >>> ", req.body); */
    const teamFor = await Team.findOne({ code: req.body.teamFor }); // con .find no funciona ya que devuelve un array de objetos, y precisamos un objeto
    /* console.log("teamFor >>> ", teamFor); */
    const teamAgainst = await Team.findOne({ code: req.body.teamAgainst });
    /* console.log("teamAgainst >>> ", teamAgainst); */

    const newGoal = await Goal.create({
      player: req.body.player,
      minute: req.body.minute,
      teamFor: teamFor._id,
      teamAgainst: teamAgainst._id,
    }); // no funciona con .create(req.body)

    /* console.log("newGoal >>> ", newGoal); */

    teamFor.goalsScored.push(newGoal._id);
    teamFor.save();
    teamAgainst.goalsConceded.push(newGoal._id);
    teamAgainst.save();

    res.json(newGoal);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(error);
    } else {
      res.status(500).json({
        error: "Ocurrió un error inesperado con la base de datos",
      });
    }
  }
};

const update = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { player: req.body.player, minute: req.body.minute },
      { new: true, runValidators: true }
    );
    if (!goal) {
      return res
        .status(404)
        .json({ error: "El gol que se quiere editar no existe" });
    }
    return res.json(goal);
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
    const goal = await Goal.findByIdAndDelete(req.params.id)
      .populate("teamFor")
      .populate("teamAgainst");
    if (!goal) {
      return res
        .status(404)
        .json({ error: "El gol que se quiere eliminar no existe" });
    }

    goal.teamFor.goalsScored.pull(goal._id);
    goal.teamFor.save();
    goal.teamAgainst.goalsConceded.pull(goal._id);
    goal.teamAgainst.save();

    return res.json(goal);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
