const { body } = require("express-validator");

const createTweet = [
  body("text")
    .isString()
    .isLength({
      max: 128,
    })
    .withMessage("El texto del tweet no puede superar los 128 caracteres"),
];

module.exports = {
  createTweet,
};
