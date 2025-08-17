const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Un usuario se conectó");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log("Usuario se unió a la sala: " + room);
  });

  socket.on("chatMessage", ({ room, msg, user }) => {
    io.to(room).emit("chatMessage", { user, msg });
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se desconectó");
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + PORT);
});
