const app = require("./src/server");
const { port } = require("./src/config");

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}!`));
