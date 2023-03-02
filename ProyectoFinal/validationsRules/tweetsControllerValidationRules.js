const { body } = require("express-validator");

const tweetValidationRules = [
  body("text").isString().isLength({
    max: 128,
  }),
];

module.exports = {
  tweetValidationRules,
};
