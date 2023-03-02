const express = require("express");
const { createValidator } = require('express-joi-validation')

const teamController = require("../controllers/teamController");

const { teamId, createTeamBody, updateTeamBody } = require("../validations/teamValidators");

/*
  Por defecto express-joi-validation controla y devuele los errores en formato Texto.
  Para nosotros poder devolver un objeto con los errores en formato json lo que hacemos es usar
  la opcion passError: true para que express-joi-validation no controle los errores.
*/
const validator = createValidator({
  passError: true,
})

const router = express.Router();

// En este caso no precisamos validar nada
router.get("/teams", teamController.index);
// Validamos los params
router.get("/teams/:id", validator.params(teamId), teamController.show);
// Validamos el body
router.post("/teams", validator.body(createTeamBody), teamController.store);
// Validamos el body y los params
router.patch("/teams/:id", validator.params(teamId), validator.body(updateTeamBody), teamController.update);
// Validamos los params
router.delete("/teams/:id", validator.params(teamId), teamController.destroy);

module.exports = router;
