const { createServer } = require("http");
const { Server } = require("socket.io");
const Room = require("./Room.js");

const PORT = 7999 || process.env.PORT;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const id = socket.id;

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${id} joined room ${room}!`);
  });

  socket.on("send-message", ({ message, room }) => {
    io.in(room).emit("new-message", { id: id, msg: message });
    console.log(`${id} sent new message in ${room}`);
  });

  socket.on("disconnect", (reason) => {
    io.emit("removePlayer", id);
  });
});

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);