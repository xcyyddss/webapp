import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; // 导入 useNavigate
import '../styles/LobbyPage.css';

const LobbyPage = () => {
  const [rooms, setRooms] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate(); // 使用 useNavigate 来进行页面跳转

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rooms/lobby');
        setRooms(response.data.rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
    
  }, []);

  return (
    <div className="lobby-container">
      <h2>Game Lobby</h2>
      <div>
        <h3>Rooms</h3>
        <ul>
          {rooms.length === 0 ? (
            <li>No rooms available</li>
          ) : (
            rooms.map(room => (
              <li key={room.id}>
                <div>Name: {room.name}</div>
                <div>Players: {room.players.length > 0 ? room.players.join(', ') : 'None'}</div>
                {/* 使用按钮并在点击时调用 navigate 函数进行页面跳转 */}
                <button onClick={() => navigate(`/rooms/${room.id}`)}>Join Room</button>
              </li>
            ))
          )}
        </ul>
      </div>
      <Link to={`/create-room/${username}`} className="create-room-link">Create Room</Link>
    </div>
  );
};

export default LobbyPage;
