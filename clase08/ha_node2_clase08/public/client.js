const socket = io.connect("http://localhost:3000");

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    // envío mensaje a servidor y lo agrego a la lista de mensajes
    socket.emit("new-message-from-client", input.value);
    const messageFromClient = document.createElement("li");
    messageFromClient.innerText = input.value;
    messages.appendChild(messageFromClient);
    input.value = "";
  }
});

// recibo mensaje del servidor
socket.on("new-message-from-server", (msg) => {
  const messageFromServer = document.createElement("li");
  messageFromServer.textContent = msg;
  messages.appendChild(messageFromServer);
});
