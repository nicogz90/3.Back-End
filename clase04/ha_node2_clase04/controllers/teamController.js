const Team = require("../models/Team");

module.exports = {
  index: async (req, res) => {
    const order = req.query.order || "asc"; // criteria can be asc, desc, ascending, descending, 1, or -1
    const skipNumber = Number(req.query.skip);
    const sortBy = req.query.sortBy || "name";
    const sortCriteria = { [sortBy]: order }; // creamos una key en el objecto usando el valor de sortBy
    const teams = await Team.find({}).setOptions({
      sort: sortCriteria,
      skip: skipNumber,
    });
    res.json(teams);
  },

  getTeam: async (req, res) => {
    try {
      var team = await Team.findOne({ code: req.params.code });
      const include = req.query.include;
      const exclude = req.query.exclude;
      if (include && exclude) {
        return res
          .status(400)
          .json({ error: "No se puede mezclar Include y Exclude" });
      } else if (exclude) {
        var team = await Team.findOne({ code: req.params.code }).select(
          `-${exclude}`
        );
      } else {
        var team = await Team.findOne({ code: req.params.code }).select(
          include
        );
      }
      if (!team) {
        return res.status(404).json({ error: "El equipo no existe" });
      }
      res.json(team);
    } catch (error) {
      res.json(error);
    }
  },

  addTeam: async (req, res) => {
    try {
      const newTeam = await Team.create(req.body);
      return res.status(201).json(newTeam);
    } catch (error) {
      res.json(error);
    }
  },
};
