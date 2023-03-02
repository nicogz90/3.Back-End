const { Router } = require("express");
const sessionRouter = require("./session.routes");
const userRouter = require("./user.routes");
const tweetRouter = require("./tweet.routes");

// Creamos un router global para las rutas públicas
const router = Router();

router.use("/sessions", sessionRouter);
router.use("/users", userRouter);
router.use("/tweets", tweetRouter);

module.exports = router;
