const socket = require("socket.io");
const User = require("./models/User");
const Message = require("./models/Message");

module.exports = (server) => {
  const io = socket(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    // usuario conectado
    console.log(`Usuario ${socket.id} conectado mediante socket!`);

    // usuario desconectado
    socket.on("disconnect", () => {
      console.log(`Usuario ${socket.id} desconectado`);
    });

    // recibo mensaje de cliente y reenvio a clientes conectados (excepto al que lo envió)
    socket.on("new-message-from-client", (msg) => {
      console.log(`message: ${msg}`);
      socket.broadcast.emit("new-message-from-server", msg);
    });
  });
};
