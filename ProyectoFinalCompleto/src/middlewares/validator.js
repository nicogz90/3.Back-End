const { validationResult } = require("express-validator");

const validatorMiddlewareBuilder = (validations) => {
  return async function (req, res, next) {
    /* for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    } */
    // alternativa mas eficiente
    // ejecutamos todas las validaciones con un Promise.all
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  };
};

module.exports = {
  validatorMiddlewareBuilder,
};
