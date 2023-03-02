const db = require("../db");

const index = async (req, res) => {
  res.json(db.teams);
};

const show = async (req, res) => {
  const id = req.params.id;
  for (const key in db.teams) {
    if (key === id) {
      return res.json(db.teams[key]);
    }
  }
  return res.status(404).json({ error: "Equipo no encontrado" });
};

// Estas son dos formas mas de resolver la busqueda:

// const show = async (req, res) => {
//   const id = req.params.id;
//   if (id in db.teams) {
//     return res.json(db.teams[id]);
//   } else {
//     return res.status(404).json({ error: "Equipo no encontrado" });
//   }
// };

// const show = async (req, res) => {
//   if (db.teams.hasOwnProperty(req.params.id)) {
//     res.json(db.teams[req.params.id]);
//   } else {
//     res.status(404).json({ error: "Equipo no encontrado" });
//   }
// };

const store = async (req, res) => {

  if (db.teams.hasOwnProperty(req.body.id)) {
    res.status(409).json({ error: "El equipo ya existe" });
  } else {
    db.teams[req.body.id] = req.body;
    res.json(db.teams[req.body.id]);
  }
};

const update = async (req, res) => {
  if (db.teams.hasOwnProperty(req.params.id)) {
    delete req.body.id; // Por las dudas, quitamos el id que eventualmente venga en el request.
    db.teams[req.params.id] = { ...db.teams[req.params.id], ...req.body };
    // Alternativa: db.teams[req.params.id] = Object.assign(db.teams[req.params.id], req.body);
    res.json(db.teams[req.params.id]);
  } else {
    res.status(404).json({ error: "Equipo no encontrado" });
  }
};

const destroy = async (req, res) => {
  if (db.teams.hasOwnProperty(req.params.id)) {
    const team = db.teams[req.params.id];
    delete db.teams[req.params.id];
    res.json(team);
  } else {
    res.status(404).json({ error: "Equipo no encontrado" });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
