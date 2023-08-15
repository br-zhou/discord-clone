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

const idToUsername = {};

io.on("connection", (socket) => {
  const id = socket.id;

  socket.on("join-room", function ({ room, username }, callback) {
    idToUsername[id] = username;
    socket.join(room);
    console.log(`${id} joined room ${room}!`);

    const roomMembers = Array.from(io.sockets.adapter.rooms.get(room));

    const usersData = [];
    for (const userId of roomMembers) {
      usersData.push({ id: userId, username: idToUsername[userId] });
    }

    if (callback) callback(usersData);
    socket.to(room).emit("new-user", { id: id, username: idToUsername[id] });
  });

  socket.on("send-message", ({ message, room, username }) => {
    io.in(room).emit("new-message", {
      msg: message,
      username: username,
      key: uuidv4(),
    });
    console.log(`${username} sent new message in ${room}`);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
    io.in(room).emit("user-leave", id);
  });

  socket.on("disconnect", (reason) => {
    io.emit("user-leave", id); // todo will cause errors in users in other rooms
    delete idToUsername[id];
    console.log(Object.keys(idToUsername));
  });
});

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);
