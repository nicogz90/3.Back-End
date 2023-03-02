const mongoose = require("mongoose");
const { dbConnectionString } = require("./config");

module.exports = () => {
  mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection
    .once("open", () => console.log("Conexión establecida satisfactoriamente"))
    .on("error", (error) => console.error("Error en la conexión", error));
};
