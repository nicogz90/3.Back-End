const socketIO = require("socket.io");
const Message = require("./models/Message");
const User = require("./models/User");


async function storeMessage(msg, username) {
  const message = await Message.create({
    text: msg,
  });

  // asociar mensaje al usuario
  const user = await User.findOneAndUpdate(
    { username: username },
    { $push: { messages: message.id } },
    { upsert: true, new: true }
  );

  // asociar usuario al mensaje
  message.user = user.id;
  await message.save();

  const messagePopulated = await message
    .populate("user", "-_id username")
    .execPopulate();
  return messagePopulated;
}

async function setUsername(username) {
  return await User.findOneAndUpdate(
    { username },
    { username },
    { upsert: true, new: true }
  );
}

module.exports = (server) => {
  const io = socketIO(server);
  io.on("connection", (socket) => {
    // Cuando un usuario se conecta, agregamos una propiedad al socket con el username
    // En un principio el username esta vacio hasta que el envie un mensaje con el username
    socket.username = "";

    console.log("conectado: " + socket.id);

    socket.on("disconnect", () => console.log("desconectado: " + socket.id));

    socket.on("new-message", async (msg) => {
      try {
        // crear mensaje
        const messagePopulated = await storeMessage(msg, socket.username);
        io.emit("new-message-ok", messagePopulated);
      } catch (error) {
        socket.emit("new-message-error", error.message);
      }
    });

    socket.on("set-username", async (username) => {
      try {
        const user = await setUsername(username);

        // Agregamos una propiedad al socket para guardar el nombre de usuario
        socket.username = user.username;
        socket.emit("set-username-ok", user.username);
      } catch (error) {
        socket.emit("set-username-error", error.message);
      }
    });
  });
};
