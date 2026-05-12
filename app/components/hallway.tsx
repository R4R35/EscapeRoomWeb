'use client'
import React from 'react'

const KEY_ITEM = 'Cafeteria/hallway_key.png'

interface HallwayProps {
  onNavigate: (destination: string) => void;
  onAction: (text: string) => void;
  onConsumeItem: (item: string) => void;
  onUnlock: (doorId: string) => void;
  unlockedDoors: string[];
  inventoryItems: (string | null)[];
}

const staticDoors = [
  {
    id: 'lab_3a',
    position: 'top-[25%] left-[29%] w-[8%] h-[60%]',
    navigateTo: 'lab',
  },
  {
    id: 'sector_b',
    position: 'top-[35%] left-[40%] w-[20%] h-[30%]',
    action: 'The vault door is sealed shut. You need a key to enter Sector B.',
  },
];

const Hallway: React.FC<HallwayProps> = ({ onNavigate, onAction, onConsumeItem, onUnlock, unlockedDoors, inventoryItems }) => {
  const greenhouseUnlocked = unlockedDoors.includes('greenhouse_door')
  const hasGreenhouseKey = inventoryItems.includes(KEY_ITEM)

  return (
    <div className="relative w-full h-full">
      <img
        src="Hallway/Hallway.png"
        alt="Hallway"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {staticDoors.map(door => (
        <button
          key={door.id}
          onClick={() => door.navigateTo ? onNavigate(door.navigateTo) : onAction(door.action!)}
          className={`absolute bg-transparent ${door.position} cursor-pointer hover:brightness-110 transition-all`}
        />
      ))}

      {/* Greenhouse door (right) */}
      <button
        onClick={() => {
          if (greenhouseUnlocked) {
            onNavigate('greenhouse')
          } else if (hasGreenhouseKey) {
            onUnlock('greenhouse_door')
            onConsumeItem(KEY_ITEM)
            onNavigate('greenhouse')
          } else {
            onAction('The door is locked. You need a key to enter the Greenhouse.')
          }
        }}
        className="absolute bg-transparent top-[25%] left-[61%] w-[8%] h-[60%] cursor-pointer hover:brightness-110 transition-all"
      />

      <button
        onClick={() => onNavigate('cafeteria')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white
                   px-6 py-2 rounded-lg hover:bg-gray-700 transition-all text-sm"
      >
        ← Back to Cafeteria
      </button>
    </div>
  );
};

export default Hallway;
