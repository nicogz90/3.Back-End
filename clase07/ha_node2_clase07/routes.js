const express = require("express");
const router = express.Router();
const { expressjwt } = require("express-jwt"); // en la nueva version se importa asi
const userController = require("./controllers/userController");

router.post("/users", userController.store);
router.post("/login", userController.login);
router.get(
  "/private",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.private
);

module.exports = router;
