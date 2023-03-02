const express = require("express");
const router = express.Router();
const userController = require("./controllers/usersController");
const tweetsController = require("./controllers/tweetsController");
const usersControllerValidationRules = require("./validationsRules/usersControllerValidationRules");
const {
  tweetValidationRules,
} = require("./validationsRules/tweetsControllerValidationRules");
const { middlewareBuilder } = require("./middleware/validator");

const { expressjwt } = require("express-jwt");

router.post(
  "/users",
  middlewareBuilder(usersControllerValidationRules.usersValidationRules),
  userController.store
);
router.post(
  "/sessions",
  middlewareBuilder(usersControllerValidationRules.usersValidationRules),
  userController.login
);
router.post(
  "/tweets",
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }),
  middlewareBuilder(tweetValidationRules),
  tweetsController.store
);

router.get("/tweets", tweetsController.show);

module.exports = router;
