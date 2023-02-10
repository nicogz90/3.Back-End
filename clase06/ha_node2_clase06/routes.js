const express = require("express");
const router = express.Router();
const teamController = require("./controllers/teamController");
const goalController = require("./controllers/goalController");

// TEAM ROUTES
router.get("/teams", teamController.index);
router.get("/teams/:code", teamController.show);
router.post("/teams", teamController.store);
router.patch("/teams/:code", teamController.update);
router.put("/teams/:code", teamController.update);
router.delete("/teams/:code", teamController.destroy);

// GOAL ROUTES
router.get("/goals", goalController.index);
router.post("/goals", goalController.store);
router.patch("/goals/:id", goalController.update);
router.put("/goals/:id", goalController.update);
router.delete("/goals/:id", goalController.destroy);

module.exports = router;
