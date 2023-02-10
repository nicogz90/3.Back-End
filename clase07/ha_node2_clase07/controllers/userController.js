const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  store: async (req, res) => {
    try {
      const newUser = await User.create(req.body); // este es un objeto de MONGOOSE, no de JS, entonces no puedo modificarlo tan facilmente --> saco la contrasena directamente desde el modelo
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      res.json({ user: newUser, accessToken: token });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error);
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
          res.json({ user, accessToken: token });
        } else {
          res.status(400).json({ error: "Incorrect password" });
        }
      } else {
        res.status(400).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  private: async (req, res) => {
    const user = await User.findById(req.auth.userId); // en la nueva version el PAYLOAD se devuelve en req.auth, en lugar de en req.user como antes
    if (user) {
      res.json({ message: "OK", user });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  },
};
