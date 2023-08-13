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

module.exports = Room;