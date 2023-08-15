const { createServer } = require("http");
const { Server } = require("socket.io");
const Room = require("./Room.js");
const { v4: uuidv4 } = require("uuid");

const PORT = 7999 || process.env.PORT;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const id = socket.id;

  socket.on("join-room", function (room, callback) {
    socket.join(room);
    console.log(`${id} joined room ${room}!`);

    const roomMembers = Array.from(io.sockets.adapter.rooms.get(room));
    const response = { users: roomMembers };
    if (callback) callback(response);
    socket.to(room).emit("new-user", id);
  });

  socket.on("send-message", ({ message, room, username }) => {
    io.in(room).emit("new-message", {
      msg: message,
      username: username,
      key: uuidv4(),
    });
    console.log(`${username} sent new message in ${room}`);
  });

  socket.on("disconnect", (reason) => {
    io.emit("user-leave", id);
  });
});

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);
