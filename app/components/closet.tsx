'use client'
import React, { useState } from 'react'
import { ClosetProps} from '../types'

const Closet: React.FC<ClosetProps> = ({ onNavigate, onAction, onPickup }) => {
  const [visibleElements, setVisibleElements] = useState({
    boxes_up: true,
    box_right: true,
    open_box: true,
    pahare: true,
    closet_key: true, 
  });

  const handleRemove = (id: keyof typeof visibleElements, message: string) => {
    setVisibleElements(prev => ({ ...prev, [id]: false }));
    onAction(message);
  };

  const handlePickKey = () => {
    onPickup('Cafeteria/hallway_key.png');
    setVisibleElements(prev => ({ ...prev, closet_key: false }));
    onAction("Found the hallway key!");
  };

  return (
    <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden">
      <img 
        src="Closet/closet.png" 
        alt="Inside the closet" 
        className="absolute inset-0 w-full h-full object-fill"
      />

      {visibleElements.closet_key && (
        <button
          onClick={handlePickKey}
          style={{ top: '65%', left: '27%', width: '7%', height: '7%' }}
          className="absolute cursor-pointer hover:brightness-125 transition-all"
        >
          <img src="Cafeteria/hallway_key.png" className="w-full h-full object-contain" alt="key" />
        </button>
      )}

      {visibleElements.boxes_up && (
        <button
          onClick={() => handleRemove('boxes_up', "Box removed")}
          style={{ top: '30%', left: '27%', width: '10%', height: '9%' }}
          className="absolute cursor-pointer hover:scale-105 transition-transform"
        >
          <img src="Closet/boxes.png" className="w-full h-full object-fill" alt="boxes" />
        </button>
      )}

      {visibleElements.box_right && (
        <button
          onClick={() => handleRemove('box_right', "Box removed")}
          style={{ top: '64%', left: '64%', width: '10%', height: '10%' }}
          className="absolute cursor-pointer hover:brightness-110"
        >
          <img src="Closet/box_right.png" className="w-full h-full object-fill" alt="box right" />
        </button>
      )}

      {visibleElements.open_box && (
        <button
          onClick={() => handleRemove('open_box', "Box removed")}
          style={{ top: '64%', left: '28%', width: '10%', height: '10%' }}
          className="absolute cursor-pointer hover:brightness-110"
        >
          <img src="Closet/open_box.png" className="w-full h-full object-fill" alt="box right" />
        </button>
      )}

      <button
        onClick={() => onNavigate('cafeteria')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white
                   px-6 py-2 rounded-lg hover:bg-gray-700 transition-all text-sm z-50"
      >
        ← Back to Cafeteria
      </button>
    </div>
  )
}
export default Closet