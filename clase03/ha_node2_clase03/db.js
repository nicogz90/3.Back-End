const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/clase03");

// NO es necesario, es solo para confirmar que se creó la conexión con la base de datos:
mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

mongoose.connection.dropDatabase();