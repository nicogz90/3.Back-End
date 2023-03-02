const { expressjwt } = require("express-jwt")
const { Router } = require("express");

const userRouter = require("./user.routes");
const tweetRouter = require("./tweet.routes");
const { jwtSecret } = require("../../config")


// Creamos un router global para las rutas privadas
const router = Router();

// Este router usa el middleware expressjwt para validar el token en todas las rutas 
// que sean registradas en este router
router.use(expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }))

router.use("/users", userRouter);
router.use("/tweets", tweetRouter);

module.exports = router;
