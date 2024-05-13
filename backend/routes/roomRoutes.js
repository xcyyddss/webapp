// backend/routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const RoomManager = require('../managers/RoomManager');

const roomManager = new RoomManager();


router.get('/lobby', async (req, res) => {
  try {
    // 查询所有房间信息
    console.log('Fetching all rooms');
    const rooms = await roomManager.getAllRooms();
    console.log('rooms', rooms);
    res.json({ rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 获取特定房间信息的路由
router.get('/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    // 根据 roomId 查询房间信息
    const room = await roomManager.getRoomById(roomId);
    console.log('players:', room.players);
    console.log('players:', room.players[0]);
    console.log('players:', room.players.length);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    // 返回房间信息
    res.json({ room });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 创建新房间的路由
router.post('/create', async (req, res) => {
  try {
    const { name, maxPlayers, username} = req.body;
    // 创建新房间
    const room = roomManager.createRoom(name, maxPlayers, username); // 这里的 owner 需要从请求中获取，可以根据实际情况修改
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
