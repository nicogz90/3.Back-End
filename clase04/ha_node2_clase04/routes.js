const router = require("express").Router();
const teamController = require("./controllers/teamController");

router.get("/teams", teamController.index);
router.get("/teams/:code", teamController.getTeam);
router.post("/teams", teamController.addTeam);

module.exports = router;
