class Message {
  constructor(user, message) {
    this.user = user;
    this.message = message;
  }
}

class Room {
  constructor(id) {
    this.id = id;
    this.messageData = [];
  }

  addMessage = (message) => {
    this.messageData.push(message);
    
    // caps saved messages
    if (this.messageData.length > 25) {
      this.messageData.shift();
    }
  };

  getRecentMessages = () => {
    return messageData;
  };
}

class RoomsManager {
  constructor() {
    this.rooms = {};
  }

  getMessageData = (id) => {
    if (this.rooms[id]) return this.rooms[id].messageData;
    else return [];
  };

  newMessage = (roomId, data) => {
    const room = this.rooms[roomId] || this.createRoom(roomId);
    room.addMessage(data);
    console.log(room.messageData);
  };

  createRoom = (id) => {
    if (this.rooms[id]) return;

    const room = new Room(id);
    this.rooms[id] = room;

    return room;
  };
}

module.exports = { Message, Room, RoomsManager };
