const { validationResult } = require("express-validator");

const middlewareBuilder = (validations) => {
  return async function (req, res, next) {
    for (validation of validations) {
      await validation.run(req);
    }

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }
    next();
  };
};

module.exports = {
  middlewareBuilder,
};
