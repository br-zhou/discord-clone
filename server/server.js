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

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`${id} joined room ${room}!`);

    const roomMembers = io.sockets.adapter.rooms.get(room);
    // socket.to(room).emit("new-user", {
    //   id: id,
    // });
    console.log(roomMembers);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    console.log(`${id} left room ${room}!`);
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
    io.emit("removePlayer", id);
  });
});

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);
