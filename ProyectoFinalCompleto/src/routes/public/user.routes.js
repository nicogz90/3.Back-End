const { Router } = require("express");
const userController = require("../../controllers/user.controller");
const { validatorMiddlewareBuilder } = require("../../middlewares/validator");
const userValidations = require("../../validations/user.validations");
const router = Router();

router.get("/", userController.list);
// TODO: implementar validacion del parametro id
router.get("/:id", userController.read);

router.post(
  "/",
  validatorMiddlewareBuilder(userValidations.createUser), // validamos los datos del usuario antes de crearlo
  userController.create
);

module.exports = router;
