const { Router } = require("express");
const tweetController = require("../../controllers/tweet.controller");

const router = Router();

// TODO: implementar validacion del parametro id
router.get("/:id", tweetController.read);

router.get("/", tweetController.list);

module.exports = router;
