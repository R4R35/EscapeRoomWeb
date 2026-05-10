'use client'
import React from 'react'
import { RoomConfigs, CafeteriaProps, InteractiveElement } from '../types'

const ROOM_CONFIGS: RoomConfigs = {
  cafeteria_1: {
    background: "cafeteria/cafeteria_closet.png",
    interactiveElements: [
      {
        id: 'cook',
        position: 'top-[38%] left-[4%] w-[65%]',
        image: "cafeteria/cook.png",
        action: 'Get a green bag of chips and a bottle of water!',
      },
      {
        id: 'closet_door',
        position: 'top-[21%] left-[69%] w-[22%] h-[70%]',
        image: "cafeteria/closet_closed_door.png",
        action: 'The door is locked! You need to find a key.',
      }
    ]
  },
  cafeteria_2: {
    background: "cafeteria/cafeteria_hallway_door.png",
    interactiveElements: [
      {
        id: 'keypad',
        position: 'top-[60%] left-[58.5%] w-[8%]',
        image: "cafeteria/digital_keypad.png",
        zoomTarget: 'digital_keypad',
      },
      {
        id: 'poster',
        position: 'top-[20.1%] left-[1.5%] w-[9.9%]',
        image: "cafeteria/poster_caf_hall.png",
        action: 'A poster about healthy eating.',
      },
      {
        id: 'vending_machine',
        position: 'top-[39%] left-[41.7%] w-[19%]',
        image: "cafeteria/tonomat_button.png",
        zoomTarget: 'vending_machine',
        zoomImage: 'cafeteria/vm_close_up.png', // 🔑 Imaginea specifică pentru zoom
      },
      {
        id: 'hallway_door',
        position: 'top-[36%] left-[12%] w-[28%]',
        image: "cafeteria/hallway_door_button.png",
        action: 'The door is locked! You need to find a key.',
      },
      {
        id: 'periodic_table',
        position: 'top-[28%] left-[70%] w-[25%]',
        image: "cafeteria/periodic_table_button.png",
        /*zoomTarget: 'periodic_table',
        zoomImage: 'cafeteria/periodic_table_close_up.png'*/
      }
    ]
  }
};

const Cafeteria: React.FC<CafeteriaProps> = ({ roomVariant, onAction, onZoom }) => {
  const config = ROOM_CONFIGS[roomVariant];
  
  if (!config) return null;

  const handleElementClick = (element: InteractiveElement) => {
    if (element.zoomTarget) {
      // Trimite și imaginea de zoom dacă există
      onZoom(element.zoomTarget, element.zoomImage);
    } else if (element.action) {
      onAction(element.action);
    }
  };

  return (
    <div className='relative w-full h-full'>
      <img 
        src={config.background} 
        alt={`Cafeteria - ${roomVariant}`}
        className="absolute inset-0 w-full h-full object-fill"
      />
      
      {config.interactiveElements.map((element: InteractiveElement) => (
        <button
          key={element.id}
          onClick={() => handleElementClick(element)}
          className={`absolute bg-transparent ${element.position} cursor-pointer hover:brightness-110 transition-all`}
        >
          <img 
            src={element.image} 
            className="w-full h-full object-fill" 
            alt={element.id}
          />
        </button>
      ))}
    </div>
  );
};

export default Cafeteria;