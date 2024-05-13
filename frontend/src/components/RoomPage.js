import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sendWebSocketMessage } from '../utils/WebSocket';
import ColorPicker from './ColorPicker'; // 导入颜色选择组件
import '../styles/RoomPage.css';

const RoomPage = ({ currentUser }) => {
  const [room, setRoom] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [currentColor, setCurrentColor] = useState('black'); // 添加当前颜色状态
  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`);
        const data = await response.json();
        setRoom(data.room);
        setIsOwner(data.room.owner === currentUser.id);
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (event) => {
      if (!isDrawing) return;
      const x = event.offsetX;
      const y = event.offsetY;
      
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(x, y);
      context.strokeStyle = currentColor;
      context.lineWidth = 2;
      context.stroke();

      lastX = x;
      lastY = y;
    };

    canvas.addEventListener('mousedown', mouseDownHandler); // 添加事件监听器
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', mouseUpHandler); // 添加事件监听器
    canvas.addEventListener('mouseout', mouseUpHandler); // 添加事件监听器

    // 创建事件处理函数，以便在移除监听器时使用
    function mouseDownHandler(event) {
      isDrawing = true;
      lastX = event.offsetX;
      lastY = event.offsetY;
    }

    function mouseUpHandler() {
      isDrawing = false;
    }

    return () => {
      // 移除事件监听器时传递事件名称
      canvas.removeEventListener('mousedown', mouseDownHandler);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', mouseUpHandler);
      canvas.removeEventListener('mouseout', mouseUpHandler);
    };
  }, [room, currentColor]); // 当 room 或 currentColor 更新时重新设置绘图事件监听器

  const handleUndo = () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // 清除画布内容
    // 在这里添加撤销操作的逻辑，例如撤销上一笔绘制
  };

  const handleStartGame = () => {
    sendWebSocketMessage({ type: 'start_game', roomId });
  };

  return (
    <div className="room-page-container"> {/* 使用className添加CSS类 */}
      {room ? (
        <div>
          <h2>{room.name}</h2>
          <p>Max Players: {room.maxPlayers}</p>
          <p>Owner: {room.owner}</p>
          <div className="canvas-container"> {/* 使用className添加CSS类 */}
            <canvas id="canvas" width="800" height="600"></canvas>
            <ColorPicker setCurrentColor={setCurrentColor} currentColor={currentColor} /> {/* 添加颜色选择组件 */}
            <button onClick={handleUndo}>Undo</button> {/* 添加撤销操作按钮 */}
          </div>
          {isOwner && (
            <button onClick={handleStartGame}>Start Game</button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoomPage;
