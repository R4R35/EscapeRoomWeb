'use client'
import React from 'react'

interface HallwayProps {
  onNavigate: (destination: string) => void;
  onAction: (text: string) => void;
}

const doors = [
  {
    id: 'lab_3a',
    position: 'top-[25%] left-[29%] w-[8%] h-[60%]',
    navigateTo: 'lab',
  },
  {
    id: 'lab_3b',
    position: 'top-[25%] left-[61%] w-[8%] h-[60%]',
    action: 'The door is locked.',
  },
  {
    id: 'sector_b',
    position: 'top-[35%] left-[40%] w-[20%] h-[30%]',
    action: 'The vault door is sealed shut. You need a key to enter Sector B.',
  },
];

const Hallway: React.FC<HallwayProps> = ({ onNavigate, onAction }) => {
  return (
    <div className="relative w-full h-full">
      <img
        src="Hallway/Hallway.png"
        alt="Hallway"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {doors.map(door => (
        <button
          key={door.id}
          onClick={() => door.navigateTo ? onNavigate(door.navigateTo) : onAction(door.action!)}
          className={`absolute bg-transparent ${door.position} cursor-pointer hover:brightness-110 transition-all`}
        />
      ))}

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
