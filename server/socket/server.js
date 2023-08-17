const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const { validateToken, getTokenUsername } = require("../util/webToken");

const createSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const idToUsername = {};

  io.on("connection", (socket) => {
    const id = socket.id;

    socket.on("join-room", function ({ room, token }, callback) {
      const username = getTokenUsername(token, id);
      idToUsername[id] = username;

      console.log(`${username} joined room ${room}!`);

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

      io.in(room).emit("new-user", { id: id, username });
      io.in(room).emit("new-message", {
        msg: `${username} joined the room!`,
        server: true,
        key: uuidv4(),
      });
    });

    socket.on("send-message", ({ message, room, token }) => {
      const username = getTokenUsername(token, id);

      io.in(room).emit("new-message", {
        msg: message,
        username,
        key: uuidv4(),
      });
      console.log(`${username} sent new message in ${room}`);
    });

    socket.on("leave-room", (room) => {
      if (!room) return;
      socket.leave(room);
      io.in(room).emit("user-leave", id);
    });

    socket.on("disconnecting", (reason) => {
      const room = Array.from(socket.rooms)[1];

      io.in(room).emit("user-leave", id);

      delete idToUsername[id];
      console.log(Object.keys(idToUsername));
    });
  });

  console.log(`Socket created!`);
};

module.exports = createSocket;
