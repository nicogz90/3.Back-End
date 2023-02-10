const User = require("../models/User");

module.exports = async () => {
  User.syncIndexes(); // Explicación: http://thecodebarbarian.com/whats-new-in-mongoose-5-2-syncindexes

  await User.create({
    firstname: "María",
    lastname: "Pérez",
    email: "maria.perez@gmail.com",
    password: "123456",
  });

  await User.create({
    firstname: "Juan",
    lastname: "Gómez",
    email: "juan.gomez@gmail.com",
    password: "123456",
  });

  console.log(`Se guardaron los usuarios de prueba en la base de datos`);
};
