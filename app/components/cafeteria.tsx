'use client'
import React from 'react'
import { RoomConfigs, CafeteriaProps, InteractiveElement } from '../types'
import { cookQuestDone } from '../gameState'

const ROOM_CONFIGS: RoomConfigs = {
  cafeteria_1: {
    background: "Cafeteria/cafeteria_closet.png",
    interactiveElements: [
      {
        id: 'cook',
        position: 'top-[38%] left-[10%] w-[40%] h-[40%]',
        action: 'I cannot work on an empty stomach. Bring me a green bag of chips and a bottle of water and i will give you the key to the closet.',
      },
      {
        id: 'closet_door',
        position: 'top-[21%] left-[69%] w-[22%] h-[70%]',
        action: 'The door is locked! You need to find a key.',
      },
    ]
  },
  cafeteria_2: {
    background: "Cafeteria/cafeteria_hallway_door.png",
    interactiveElements: [
      {
        id: 'keypad',
        position: 'top-[60%] left-[58.5%] w-[8%] h-[15%]',
        zoomTarget: 'digital_keypad',
      },
      {
        id: 'poster',
        position: 'top-[20.1%] left-[1.5%] w-[9.9%]  h-[40%]',
        action: 'A poster about healthy eating.',
      },
      {
        id: 'vending_machine',
        position: 'top-[39%] left-[41.7%] w-[19%] h-[40%]',
        zoomTarget: 'vending_machine',
        zoomImage: 'Cafeteria/vm_close_up.png',
      },
      {
        id: 'hallway_door',
        position: 'top-[36%] left-[12%] w-[28%] h-[55%]',
        action: 'The door is locked! You need to find a key.',
      },
      {
        id: 'periodic_table',
        position: 'top-[28%] left-[70%] w-[25%] h-[25%]',
        action: 'A periodic table.'
      }
    ]
  }
};

const Cafeteria: React.FC<CafeteriaProps> = ({ roomVariant, onAction, onZoom, onNavigate, 
  inventoryItems, selectedSlot,unlockedDoors, onUnlock }) => {
  const config = ROOM_CONFIGS[roomVariant];

  if (!config) return null;

  const handleElementClick = (element: InteractiveElement) => {

    const selectedItem = selectedSlot !== null ? inventoryItems[selectedSlot] : null;
    const isAlreadyUnlocked = unlockedDoors.includes(element.id);

    if (element.id === 'hallway_door') {
    if (isAlreadyUnlocked) {
      onNavigate?.('hallway');
    } else if (selectedItem?.toLowerCase() === "cafeteria/hallway_key.png") {
      onAction("You used the key! The door is now open.");
      onUnlock('hallway_door');
      onNavigate?.('hallway');
    } else {
      onAction("The hallway door is locked.");
    }
    return;
  }

  if (element.id === 'closet_door') {
    if (isAlreadyUnlocked) {
      onNavigate?.('closet');
    } else if (selectedItem?.toLowerCase() === "cafeteria/closet_key.png") {
      onAction("Closet unlocked! Now the door is open.");
      onUnlock('closet_door');
      onNavigate?.('closet');
    } else {
      onAction("The closet door is locked.");
    }
    return;
  }

    if (element.id === 'cook') {
      onAction(cookQuestDone
        ? 'Blue chips, red chips, big bottle, orange chips, water ' // TODO: add post-quest cook dialogue
        : element.action ?? ''
      );
      return;
    }

    if (element.navigateTo && onNavigate) {
      onNavigate(element.navigateTo);
    } else if (element.zoomTarget) {
      onZoom(element.zoomTarget, element.zoomImage);
    } else if (element.action) {
      onAction(element.action);
    }
  };

  return (
    <div className='relative w-full h-full'>
      <img 
        src={config.background} 
        alt="Background"
        className="absolute inset-0 w-full h-full object-fill"
      />
      
      {config.interactiveElements.map((element: InteractiveElement) => (
        <button
          key={element.id}
          onClick={() => handleElementClick(element)}
          className={`absolute ${element.position} cursor-pointer transition-all ${
            element.buttonStyle ?? 'bg-transparent hover:brightness-110'
          }`}
        />
      ))}
    </div>
  );
};

export default Cafeteria;