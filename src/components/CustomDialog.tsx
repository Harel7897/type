import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './CustomDialog.css';
import { useGraphContext } from './GraphContext';

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { text: string; color: string }) => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#ffffff');
  const {addNode}=useGraphContext();

  if (!isOpen) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleColorChange = (newColor: { hex: string }) => {
    setColor(newColor.hex);
  };

  const handleAddMarker = () => {
    if (text) {
      onSubmit({ text, color }); // שולח את הנתונים ל-MapComponent
      onClose(); // סגור את הדיאלוג
    }
  };
  const handleAddnode=()=>{
    if(text){
      addNode(text,text,color)
    
      onClose()
    }
   
  }

  return (
    <div className="custom-dialog-overlay">
      <div className="custom-dialog">
        <h2>Custom Dialog</h2>
        <h3 
        className='enter-text' >
          Enter Text:

          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter name"
          />
        </h3>

       

        <div className="color-picker">
          <h4 className='tytel-color'>Pick a Color</h4>
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>

        <div className="dialog-actions">
          <button className='B1' onClick={handleAddMarker}>Add Marker</button>
          <button className='B2' onClick={handleAddnode}>Add Node</button>
          <button className='B3' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
