const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const checkJwt = require("express-jwt");

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
      const user = await User.findById(req.user.sub);
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
