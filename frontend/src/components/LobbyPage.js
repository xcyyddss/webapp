import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 导入 React Router 中的 Link 组件

const LobbyPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // 在组件加载时调用后端 API 获取房间信息
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();

    // 使用 WebSocket 实时更新房间信息
    const socket = new WebSocket('ws://localhost:8000/ws');
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 处理从后端收到的实时更新数据
      setRooms(data.rooms);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>Game Lobby</h2>
      <div>
        <h3>Rooms</h3>
        <ul>
          {rooms.map(room => (
            <li key={room.id}>
              <div>Room ID: {room.id}</div>
              <div>Mode: {room.mode}</div>
              <div>Players: {room.players.map(player => player.name).join(', ')}</div>
              {/* 添加加入房间的链接 */}
              <Link to={`/rooms/${room.id}`}>Join Room</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* 添加创建房间的链接 */}
      <Link to="/create-room">Create Room</Link>
    </div>
  );
};

export default LobbyPage;
