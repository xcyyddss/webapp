// frontend/src/components/RoomPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sendWebSocketMessage } from '../utils/WebSocket';

const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { roomId } = useParams();

  useEffect(() => {
    // 从后端获取房间信息
    const fetchRoom = async () => {
      try {
        // 发起请求获取房间信息
        // 注意：这里的逻辑需要根据你的项目具体实现来修改
        const response = await fetch(`/api/rooms/${roomId}`);
        const data = await response.json();
        setRoom(data.room);
        
        // 检查当前用户是否为房主
        // 注意：这里的逻辑需要根据你的项目具体实现来修改
        setIsOwner(data.room.owner === currentUser.id);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleStartGame = () => {
    // 向后端发送开始游戏消息
    // 注意：这里的逻辑需要根据你的项目具体实现来修改
    sendWebSocketMessage({ type: 'start_game', roomId });
  };

  return (
    <div>
      {room ? (
        <div>
          <h2>{room.name}</h2>
          <p>Max Players: {room.maxPlayers}</p>
          <p>Owner: {room.owner}</p>
          <h3>Players:</h3>
          <ul>
            {room.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
          {isOwner && (
            <button onClick={handleStartGame}>Start Game</button>
          )}
          <canvas id="canvas" width="800" height="600"></canvas>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoomPage;
