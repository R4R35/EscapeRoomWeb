'use client'
import React, { useState } from 'react'

interface BotanicGardenProps {
  onAction: (message: string) => void;
  onZoom: (target: string, image?: string) => void;
  activeItem?: string | null;
  onPickup: (item: string) => void;
  onNavigate: (destination: string) => void;
}

const BotanicGarden: React.FC<BotanicGardenProps> = ({ onAction, onZoom, activeItem, onPickup, onNavigate }) => {
  // --- PUZZLE STATES ---
  const [isMousePickedUp, setIsMousePickedUp] = useState(false);
  
  const [isPlant1Watered, setIsPlant1Watered] = useState(false);
  
  const [isPlant2Fed, setIsPlant2Fed] = useState(false);
  // Stări noi pentru a face cheile să apară fizic în scenă
  const [isChestKeySpitOut, setIsChestKeySpitOut] = useState(false);
  const [isChestKeyPickedUp, setIsChestKeyPickedUp] = useState(false);

  const [isChestOpen, setIsChestOpen] = useState(false);
  const [isMasterKeyPickedUp, setIsMasterKeyPickedUp] = useState(false);
  
  const [isDoorUnlocked, setIsDoorUnlocked] = useState(false);

  // --- INTERACTION HANDLERS ---
  
  const handlePickUpMouse = () => {
    setIsMousePickedUp(true);
    onPickup('BotanicGarden/mouse.png');
    onAction('You caught the mouse running around the greenhouse!');
  };

  const handlePlant1Click = () => {
    if (isPlant1Watered) {
      onAction("The plant has grown beautifully and revealed the chest hidden at its roots.");
    } else if (activeItem && activeItem.includes('g10')) { // Adaptează id-ul poțiunii tale
      setIsPlant1Watered(true);
      onAction("You used the substance from the lab! The plant grew instantly.");
    } else {
      onAction("This plant is withered. It needs a special substance to grow.");
    }
  };

  const handlePlant2Click = () => {
    if (isPlant2Fed) {
      onAction("The carnivorous plant is sleeping peacefully after eating.");
    } else if (activeItem && activeItem.includes('mouse')) {
      setIsPlant2Fed(true);
      setIsChestKeySpitOut(true); // Facem cheia să apară
      onAction("You fed the mouse to the carnivorous plant! It spat out a chest key.");
    } else {
      onAction("A dangerous carnivorous plant! It looks very hungry, I wouldn't put my hand near it...");
    }
  };

  const handlePickUpChestKey = () => {
    setIsChestKeyPickedUp(true);
    setIsChestKeySpitOut(false);
    onPickup('BotanicGarden/chest key.png');
    onAction("You picked up the chest key!");
  };

  const handleChestClick = () => {
    if (isChestOpen) {
      onAction("The chest is already open.");
    } else if (!isPlant1Watered) {
      onAction("The chest is blocked by the plant's roots. You need to make it grow first!");
    } else if (activeItem && activeItem.includes('chest key')) {
      setIsChestOpen(true);
      onAction("You opened the chest with the key spat out by the plant! Inside is a Master Key.");
    } else {
      onAction("The chest is locked. You need the right key.");
    }
  };

  const handlePickUpMasterKey = () => {
    setIsMasterKeyPickedUp(true);
    onPickup('BotanicGarden/masterKey.png');
    onAction("You picked up the Master Key from the chest!");
  };

  const handleDoorClick = () => {
    if (isDoorUnlocked) {
      onAction("The door is unlocked! You can go ahead.");
      // onNavigate('next_room'); 
    } else if (activeItem && activeItem.includes('masterKey')) {
      setIsDoorUnlocked(true);
      onAction("You unlocked the door with the Master Key!");
    } else {
      onAction("The door to the next room is locked!");
    }
  };

  // --- BACKGROUND LOGIC ---
  let bgImage = "/BotanicGarden/botanicgarden.png";
  if (isChestOpen) {
    bgImage = "/BotanicGarden/CufarDeschis.png";
  } else if (isPlant1Watered) {
    bgImage = "/BotanicGarden/plantaCrescutaCufar.png";
  }

  return (
    <div className='relative w-full h-full bg-zinc-900'>
      {/* Main Background */}
      <img src={bgImage} alt="Botanic Garden" className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700" />

      {/* DOOR HITBOX */}
      <button onClick={handleDoorClick} className="absolute top-[20%] left-[5%] w-[15%] h-[70%] cursor-pointer hover:bg-white/10 transition-all z-0 rounded-lg">
        <span className="sr-only">Inspect Door</span>
      </button>

      {/* COLLECTIBLE MOUSE */}
      {!isMousePickedUp && (
        <button 
          onClick={handlePickUpMouse} 
          className="absolute top-[82%] left-[72%] w-[5%] cursor-pointer hover:brightness-110 hover:scale-110 transition-all z-20"
        >
          <img src="/BotanicGarden/mouse.png" className="w-full h-full object-contain drop-shadow-lg" alt="Mouse" />
        </button>
      )}

      {/* CARNIVOROUS PLANT */}
      <button 
        onClick={handlePlant2Click} 
        className="absolute top-[62%] left-[82%] w-[15%] cursor-pointer hover:brightness-110 transition-all z-10"
      >
        <img 
          src={isPlant2Fed ? "/BotanicGarden/plantaMancata.png" : "/BotanicGarden/plantaNemancatapng.png"} 
          className="w-full h-full object-contain drop-shadow-2xl transition-all" 
          alt="Carnivorous Plant" 
        />
      </button>

      {/* CHEST KEY (Apare după ce planta mănâncă șoarecele) */}
      {isChestKeySpitOut && !isChestKeyPickedUp && (
        <button 
          onClick={handlePickUpChestKey} 
          className="absolute top-[85%] left-[70%] w-[10%] cursor-pointer hover:brightness-110 hover:scale-110 transition-all z-20 animate-bounce"
        >
          <img src="/BotanicGarden/chest key.png" className="w-full h-full object-contain drop-shadow-lg" alt="Chest Key" />
        </button>
      )}

      {/* PLANT 1 (Masca pentru când e mică vs masca pentru cufăr când e mare) */}
      {!isPlant1Watered ? (
        <button 
          onClick={handlePlant1Click} 
          // Am adăugat scale-[2.5] la final. Poți schimba numărul 2.5 cu orice valoare vrei!
          className="absolute top-[50%] left-[39%] w-[8%] h-[10%] cursor-pointer hover:brightness-110 transition-all z-10 rounded-lg scale-[2.5]"
        >
          <img src="/BotanicGarden/plantaNecrescuta.png" className="w-full h-full object-contain drop-shadow-lg" alt="Potted Plant" />
        </button>
      ) : (
        <button 
          onClick={handleChestClick} 
          className="absolute top-[45%] left-[40%] w-[20%] h-[20%] cursor-pointer hover:bg-white/10 transition-all z-10 rounded-lg"
        >
          <span className="sr-only">Chest</span>
        </button>
      )}

      {/* MASTER KEY (Apare înăuntru doar după ce deschizi cufărul) */}
      {isChestOpen && !isMasterKeyPickedUp && (
        <button 
          onClick={handlePickUpMasterKey} 
          className="absolute top-[39%] left-[48%] w-[6%] cursor-pointer hover:brightness-110 hover:scale-110 transition-all z-20"
        >
          <img src="/BotanicGarden/masterKey.png" className="w-full h-full object-contain drop-shadow-lg" alt="Master Key" />
        </button>
      )}

      {/* BUTTON: BACK TO HALLWAY */}
      <button
        onClick={() => onNavigate('hallway')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/80 border border-gray-600 text-gray-200
                   px-6 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all text-sm z-50 shadow-lg backdrop-blur-sm"
      >
        ← Back to Hallway
      </button>
    </div>
  );
};

export default BotanicGarden;