const { Router } = require("express")

const publicRouter = require("./public")
const privateRouter = require("./private")

// Creamos un router global que registra todos los routers
const router = Router();


router.use(publicRouter);
router.use(privateRouter);


module.exports = router;
