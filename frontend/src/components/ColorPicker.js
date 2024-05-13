// frontend/src/components/ColorPicker.js
import React from 'react';
import '../styles/ColorPicker.css';

const ColorPicker = ({ setCurrentColor, currentColor }) => {
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  return (
    <div className="color-picker-container"> {/* 使用className添加CSS类 */}
      {colors.map(color => (
        <div
          key={color}
          className="color-option" 
          style={{ backgroundColor: color }}
          onClick={() => setCurrentColor(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
