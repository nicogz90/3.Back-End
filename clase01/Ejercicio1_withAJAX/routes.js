const express = require("express");
const router = express.Router();
const pagesController = require("./controllers/pagesController");

router.get("/", pagesController.home);
router.get("/fecha", pagesController.date);
router.get("/multiplicar", pagesController.multiplyForm);
router.post("/multiplicar", pagesController.multiply);

module.exports = router;
