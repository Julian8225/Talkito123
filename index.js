const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

// Servir los archivos de la carpeta "public"
app.use(express.static("public"));

// Si no encuentra el archivo, devolver siempre index.html
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// --- Socket.io ---
io.on("connection", (socket) => {
  console.log("Un usuario conectado");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Iniciar servidor
http.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
