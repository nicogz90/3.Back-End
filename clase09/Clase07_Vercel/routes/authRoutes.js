const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/tokens", authController.newToken);

module.exports = router;
