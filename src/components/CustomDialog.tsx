import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './CustomDialog.css';
import { useGraphContext } from './GraphContext';

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { text: string; color: string;}) => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, onClose }) => {
  const { addNode} = useGraphContext();
  const [text, setText] = useState<string>('');
  const [color, setColor] = useState<string>('#ffffff');

  if (!isOpen) return null; // הסתר את הדיאלוג אם הוא סגור

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleColorChange = (newColor: { hex: string }) => {
    setColor(newColor.hex);
  };

  const handleSubmit = () => {
    if (text) {
      addNode(text, text, color); // הוספת Node חדש לגרף
    }
    onClose(); // סגור את הדיאלוג
  };

 

  return (
    <div className="custom-dialog-overlay">
      <div className="custom-dialog">
        <h2>Custom Dialog</h2>

        <label>
          Enter Text:
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Node name"
          />
        </label>

        <div className="color-picker">
          <h4>Pick a Color:</h4>
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>

        <div className="dialog-actions">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
        
      </div>
    </div>
  );
};

export default CustomDialog;
