const mongoose = require("mongoose");
const Team = require("../models/Team");

const index = async (req, res) => {
  const skip = Number(req.query.skip);
  const order = req.query.order || "asc"; // criteria can be asc, desc, ascending, descending, 1, or -1
  const sortBy = req.query.sortBy || "code";
  const sortCriteria = {
    [sortBy]: order, // creamos una key en el objecto usando el valor de sortBy
  };

  const teams = await Team.find({}).setOptions({
    sort: sortCriteria,
    skip: skip,
    // lean: true // Cuando esta opción es true en lugar de retornar un documento de Mongoose, lo convierte a objeto de JavaScript >> queda menos pesado, pero se pierden funcionalidades de Mongoose, como por ejemplo .save()
  });
  /* Otra forma:
  const teams = await Team.find({}).sort(sortCriteria).skip(skip);
  */
  res.json(teams);
};

const show = async (req, res) => {
  try {
    const code = req.params.code;
    const team = await Team.findOne({ code });

    /* Con opción de ´select´:

    >> A)
      const include = req.query.include;
      const exclude = req.query.exclude;
      
      if (include && exclude) {
        return res
          .status(400)
          .json({ error: "No se puede mezclar Include y Exclude" });
      } else if (exclude) {
        const team = await Team.findOne({ code }).select(`-${exclude}`);
      } else {
        const team = await Team.findOne({ code }).select(include);
      } 
      
    >> B)
    const select = req.query.select; // "name flag x...."
    const selectArray = select.split(" ");

    const conditionOne = selectArray.every((field) => {
      return field.startsWith("-");
      });

    const conditionTwo = selectArray.every((field) => {
      return !field.startsWith("-");
      });

    if (!conditionOne && !conditionTwo) {
      return res.status(400).json({
        error: "Todos los campos deben comenzar con un - o ninguno lo debe tener",
      });
    }

    const team = await Team.findOne({ code }).select(select);

    */

    if (!team) {
      return res.status(404).json({
        error: "El equipo no existe.",
      });
    }
    res.json(team);
  } catch (error) {
    res.json(error);
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
