const express = require("express");
const teamController = require("./controllers/teamController");

const router = express.Router();

router.get("/teams", teamController.index);
router.get("/teams/:id", teamController.show);
router.post("/teams", teamController.store);
router.patch("/teams/:id", teamController.update);
router.delete("/teams/:id", teamController.destroy);

module.exports = router;
