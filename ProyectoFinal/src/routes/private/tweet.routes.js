const { Router } = require("express");
const tweetController = require("../../controllers/tweet.controller");
const { validatorMiddlewareBuilder } = require("../../middlewares/validator");
const tweetValidations = require("../../validations/tweet.validations");

const router = Router();

router.post(
  "/",
  validatorMiddlewareBuilder(tweetValidations.createTweet), // validamos los datos del tweet antes de crearlo
  tweetController.store
);

// TODO: implementar validacion del parametro id
router.delete("/:id", tweetController.remove);

// TODO: implementar validacion del parametro id
// TODO: implementar validacion del body del tweet
router.patch("/:id", tweetController.update);

module.exports = router;
