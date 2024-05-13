import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 修改导入语句
import axios from 'axios';
import '../styles/CreateRoomPage.css';

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4); // 默认最大玩家数为4
  const navigate = useNavigate(); // 修改此处
  
  const { username } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 向后端发送创建房间的请求
      const response = await axios.post('http://localhost:8080/api/rooms/create', {
        name: roomName,
        maxPlayers,
        username
      });
      // 成功创建房间后，跳转到房间页面
      navigate(`/rooms/${response.data.room.id.toString()}`); // 修改此处
    } catch (error) {
      console.error('Error creating room:', error);
      // 处理错误
    }
  };
  return (
    <div className="create-room-container"> {/* 使用className添加CSS类 */}
      <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container"> {/* 使用className添加CSS类 */}
          <label htmlFor="roomName">Room Name:</label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div className="input-container"> {/* 使用className添加CSS类 */}
          <label htmlFor="maxPlayers">Max Players:</label>
          <input
            type="number"
            id="maxPlayers"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRoomPage;
