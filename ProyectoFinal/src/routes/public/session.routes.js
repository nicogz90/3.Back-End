const { Router } = require("express");
const userController = require("../../controllers/user.controller");
const { validatorMiddlewareBuilder } = require("../../middlewares/validator");
const userValidations = require("../../validations/user.validations");

const router = Router();

router.post(
  "/",
  validatorMiddlewareBuilder(userValidations.login), // validamos los datos del usuario antes de pasar al login
  userController.generateToken
);

module.exports = router;
