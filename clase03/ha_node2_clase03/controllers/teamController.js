const Team = require("../models/Team");

module.exports = {
  index: async (req, res) => {
    const teams = await Team.find({});
    res.json(teams);
  },
};
