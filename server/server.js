const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const { router: apiRoutes } = require("./routes/api.js");

const PORT = 7999 || process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRoutes);
const httpServer = createServer(app);

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

    console.log(`${id} joined room ${room}!`);

    if (callback) {
      const roomMembersSet = io.sockets.adapter.rooms.get(room);
      const roomMembersArr = Array.from(roomMembersSet || new Set());

      const usersData = [];
      for (const userId of roomMembersArr) {
        usersData.push({ id: userId, username: idToUsername[userId] });
      }
      callback(usersData);
    }

    socket.join(room);
    io.in(room).emit("new-user", { id: id, username: idToUsername[id] });
    io.in(room).emit("new-message", {
      msg: `${idToUsername[id]} joined the room!`,
      server: true,
      key: uuidv4(),
    });
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

  socket.on("disconnecting", (reason) => {
    const room = Array.from(socket.rooms)[1];

    io.in(room).emit("user-leave", id);

    io.in(room).emit("new-message", {
      msg: `${idToUsername[id]} left the room.`,
      server: true,
      key: uuidv4(),
    });

    delete idToUsername[id];
  });
});

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);
