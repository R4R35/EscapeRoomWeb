'use client'
import React from 'react'

interface HallwayProps {
  onNavigate: (destination: string) => void;
  onAction: (text: string) => void;
  onConsumeItem: (item: string) => void;
  onUnlock: (doorId: string) => void;
  unlockedDoors: string[];
  inventoryItems: (string | null)[];
  selectedSlot: number | null;
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
    navigateTo: 'sector_b',
    action: 'The vault door is sealed shut. You need a key to enter Sector B.',
  },
];

const Hallway: React.FC<HallwayProps> = ({ onNavigate, onAction, onConsumeItem, onUnlock, unlockedDoors, inventoryItems, selectedSlot }) => {
  const greenhouseUnlocked = unlockedDoors.includes('greenhouse_door')
  const selectedItem = selectedSlot !== null ? inventoryItems[selectedSlot] : null

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
    onClick={() => {
      if (door.id === 'sector_b') {
        // Dacă ușa e deja descuiată, treci direct la ecranul de win
        if (unlockedDoors.includes('sector_b')) {
          onNavigate('win');
        } 
        // Verificăm numele corect al fișierului ('masterKey')
        else if (selectedItem?.includes('masterKey')) {
          onUnlock('sector_b');
          onConsumeItem(selectedItem);
          // AICI e cheia: navigăm către ecranul de final!
          onNavigate('win'); 
        } else {
          onAction(door.action!);
        }
      } else {
        door.navigateTo ? onNavigate(door.navigateTo) : onAction(door.action!);
      }
    }}
    className={`absolute bg-transparent ${door.position} cursor-pointer hover:brightness-110 transition-all`}
  />
))}
      {/* Greenhouse door (right) */}
      <button
        onClick={() => {
          if (greenhouseUnlocked) {
            onNavigate('botanicGarden')
          } else if (selectedItem?.includes('greenhouse_key')) {
            onUnlock('greenhouse_door')
            onConsumeItem(selectedItem)
            onNavigate('botanicGarden')
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
