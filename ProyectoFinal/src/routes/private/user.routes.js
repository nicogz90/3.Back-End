const { Router } = require("express");
const userController = require("../../controllers/user.controller");
const router = Router();

// TODO: implementar validacion del parametro id
router.delete("/:id", userController.remove);

// TODO: implementar validacion del parametro id
// TODO: implementar validacion del body del usuario
router.patch("/:id", userController.update);

module.exports = router;
