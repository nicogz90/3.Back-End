const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const checkJwt = require("express-jwt"); // middleware de autenticación. en la nueva version se importa { expressjwt }

module.exports = (app) => {
  app.use(authRoutes);
  app.use("/users", userRoutes);

  app.get(
    "/private",
    checkJwt({
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    }),
    async (req, res) => {
      const User = require("../models/User");
      const user = await User.findById(req.user.sub); // en la nueva version el PAYLOAD se devuelve en req.auth, en lugar de en req.user como antes
      if (user) {
        res.json({
          mensaje: "OK",
          user,
        });
      } else {
        res.status(400).json({
          error: "El usuario no existe",
        });
      }
    }
  );
};
