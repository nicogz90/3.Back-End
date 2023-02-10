const Team = require("../models/Team");

const index = async (req, res) => {
  const teams = await Team.find({});
  res.json(teams);
};

const show = async (req, res) => {
  // Se implementará próximamente...
};

const store = async (req, res) => {
  // Se implementará próximamente...
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
