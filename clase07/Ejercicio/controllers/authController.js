const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password; // contraseña plana

    try {
      const user = await User.findOne({ email });
      const match = await user.comparePassword(password); // método agregado en el modelo
      if (match) {
        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
        res.json({
          user,
          accessToken: token,
        });
      } else {
        res.status(400).json({ error: "Credenciales inválidas." });
      }
    } catch (error) {
      console.log(`No se encontró el email: ${email}`);
      console.log(error);
      res.status(400).json({ error: "Credenciales inválidas." });
    }
  },
};
