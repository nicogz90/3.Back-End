const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  index: async (req, res) => {
    // No implementado...
  },

  show: async (req, res) => {
    // No implementado...
  },

  store: async (req, res) => {
    try {
      const newUser = await User.create(req.body); // OJO: Esto puede ser peligroso debido al "Mass Assignment".
      const token = jwt.sign({ sub: newUser.id }, process.env.JWT_SECRET);
      res.json({
        accessToken: token,
        user: newUser,
      });
      return res.status(201).json(newUser);
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
    // No implementado...
  },

  destroy: async (req, res) => {
    // No implementado...
  },
};
