const Joi = require('joi');

// Escribimos todas las validaciones que queremos para nuestros endpoints usando Joi: https://joi.dev/
const createTeamBody = Joi.object({
  name: Joi.string().required(),
  flag: Joi.string().required(),
  id: Joi.string().length(2).required()
})

const updateTeamBody = Joi.object({
  name: Joi.string().optional(),
  flag: Joi.string().optional(),
})

const teamId = Joi.object({
  id: Joi.string().length(2).required()
})

module.exports = {
  createTeamBody,
  updateTeamBody,
  teamId,
}
