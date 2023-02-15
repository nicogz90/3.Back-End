const router = require("express").Router();
const goalController = require("../controllers/goalController");

router.get("/", goalController.index);
router.post("/", goalController.store);
router.patch("/:id", goalController.update);
router.put("/:id", goalController.update);
router.delete("/:id", goalController.destroy);

module.exports = router;
