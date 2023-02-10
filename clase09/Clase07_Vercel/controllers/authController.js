const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  newToken: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "Credenciales inválidas." });
      }
      const match = await user.comparePassword(password);
      if (match) {
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
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
