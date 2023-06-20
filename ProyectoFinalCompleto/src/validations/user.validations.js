const { body, oneOf, check } = require("express-validator");

const createUser = [
  body("email").isEmail().withMessage("El email no es valido"),
  body("username")
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  ,
  body("password")
    .isString()
    .isLength({
      min: 4,
    })
    .withMessage("La contraseña debe tener al menos 20 caracteres"),
];

const login = [
  oneOf([
    body("username").isEmail().withMessage("El email no es valido"),
    body("username")
      .isString()
      .isLength({
        min: 3,
      })
      .withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  ]),
  body("password")
    .isString()
    .isLength({
      min: 4,
    })
    .withMessage("La contraseña debe tener al menos 20 caracteres"),
];

module.exports = {
  createUser, // exportamos el schema de validaciones para crear un usuario
  login, // exportamos el schema de login que resulta ser el mismo que el de crear usuario
};
