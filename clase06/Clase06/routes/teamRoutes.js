const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.index);
router.get("/:code", teamController.show);
router.post("/", teamController.store);
router.patch("/:code", teamController.update);
router.put("/:code", teamController.update);
router.delete("/:code", teamController.destroy);

module.exports = router;
