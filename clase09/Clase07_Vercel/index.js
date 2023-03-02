require("dotenv").config();
const app = require("./server");

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}!`));
