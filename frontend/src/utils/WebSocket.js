// frontend/src/utils/WebSocket.js

let socket;

export const initWebSocket = () => {
  socket = new WebSocket('ws://localhost:8000/ws');

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // 处理从后端收到的实时更新数据
    console.log('Received message from server:', data);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };

  return socket;
};

export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket connection not established');
  }
};
