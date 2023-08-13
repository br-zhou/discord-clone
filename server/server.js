const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = 7999 || process.env.PORT;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

class Room {
  constructor() {
    this.users = {};
  }

  addUser(socketId) {
    this.users[socketId] = true;
    console.log(`${socketId} added!`);
  }

  removeUser(socketId) {
    delete this.users[socketId];
    console.log(`${socketId} removed!`);
  }
}

const room = new Room();

io.on("connection", (socket) => {
  const id = socket.id;
  room.addUser(id);

  // Broadcast Event
  socket.broadcast.emit("addUser", { id, data: room.users[id] });

  socket.emit("getInitialData", {
    users: room.users,
  });

  socket.on("disconnect", (reason) => {
    room.removeUser(id);
    io.emit("removePlayer", id);
  });
});

httpServer.listen(PORT);
console.log(`Server initalized on port ${PORT}`);
