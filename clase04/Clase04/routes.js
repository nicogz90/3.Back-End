const express = require("express");
const router = express.Router();
const teamController = require("./controllers/teamController");

router.get("/teams", teamController.index);
router.get("/teams/:code", teamController.show);
router.post("/teams", teamController.store);
router.patch("/teams/:code", teamController.update);
router.put("/teams/:code", teamController.update);
router.delete("/teams/:code", teamController.destroy);

module.exports = router;
