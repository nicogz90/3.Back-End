const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      // Explicación: https://mongoosejs.com/docs/deprecations.html
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    mongoose.connection.on("error", (error) => {
      console.log(
        "Error mientras se tenía conexión con la base de datos.",
        error
      );
    });
  } catch (error) {
    console.error("Error al iniciar conexión con la base de datos.", error);
  }
};
