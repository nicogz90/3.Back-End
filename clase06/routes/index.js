const goalRoutes = require("./goalRoutes");
const teamRoutes = require("./teamRoutes");

module.exports = (app) => {
  app.use("/goals", goalRoutes);
  app.use("/teams", teamRoutes);
};
