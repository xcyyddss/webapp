// backend/models/Room.js

class Room {
    constructor(id, name, maxPlayers, owner) {
      this.id = id;
      this.name = name;
      this.maxPlayers = maxPlayers; // 新增最大玩家数属性
      this.owner = owner; // 新增房主属性
      this.players = [owner]; // 初始化玩家数组
    }
  
    addPlayer(player) {
      if (this.players.length < this.maxPlayers) {
        this.players.push(player);
        return true; // 返回添加成功
      }
      return false; // 返回添加失败
    }
  
    removePlayer(playerId) {
      this.players = this.players.filter(player => player.id !== playerId);
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        maxPlayers: this.maxPlayers, // 添加最大玩家数到返回的 JSON 中
        owner: this.owner, // 添加房主到返回的 JSON 中
        players: this.players.map(player => ({ id: player.id, name: player.name }))
      };
    }
  }
  
  module.exports = Room;
  