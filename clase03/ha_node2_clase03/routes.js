const router = require("express").Router();
const teamController = require("./controllers/teamController");

router.get("/teams", teamController.index);

module.exports = router;
