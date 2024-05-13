const Room = require('../models/Room');

class RoomManager {
  constructor() {
    this.rooms = [];
    this.nextRoomId = 0; // 下一个房间的 id
  }

  createRoom(name, maxPlayers, owner) {
    const room = new Room(
      (this.nextRoomId++).toString(), // 分配自增的 id
      name,
      maxPlayers,
      owner // 将房主加入房间
    );
    this.rooms.push(room);
    console.log('Room created:', room.id);
    return room;
  }

  getRoomById(id) {
    return this.rooms.find(room => room.id === id);
  }

  getAllRooms() {
    return this.rooms;
  }

  joinRoom(roomId, player) {
    const room = this.getRoomById(roomId);
    if (room && room.players.length < room.maxPlayers) {
      room.players.push(player);
      return true;
    }
    return false;
  }

  startGame(roomId) {
    const room = this.getRoomById(roomId);
    // 实现开始游戏的逻辑，你可以在这里添加游戏开始时的处理
    if (room && room.owner === player.id && room.players.length >= 2) {
      // 向房间内的所有玩家发送游戏开始的消息，或者触发其他游戏逻辑
    }
  }
}

module.exports = RoomManager;
