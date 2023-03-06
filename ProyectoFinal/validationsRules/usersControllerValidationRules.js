const { body } = require("express-validator");

const usersValidationRules = [
  body("username").isString().isLength({
    min: 3,
  }),
  body("email").isEmail(),
  body("password").isString().isLength({
    min: 4,
  }),
];

module.exports = {
  usersValidationRules,
};
