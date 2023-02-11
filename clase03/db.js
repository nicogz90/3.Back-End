const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// NO es necesario, es solo para confirmar que se creó la conexión con la base de datos:
mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

mongoose.connection.dropDatabase();

module.exports = connect;
