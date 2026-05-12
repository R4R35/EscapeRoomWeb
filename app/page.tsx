'use client'
import React, { useState, useEffect } from 'react'
import Cafeteria from './components/cafeteria'
import DigitalKeypad from './components/digitalKeypad'
import Hallway from './components/hallway'
import Lab from './components/lab'
import Closet from './components/closet'
import Bottles from './components/bottles'
import { inventory, addToInventory, markCookQuestDone } from './gameState'
import { RoomConfigs, Scene } from './types'

const rooms = ['cafeteria_1', 'cafeteria_2'] as const;

const MainPage = () => {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [activeZoom, setActiveZoom] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<string>("");
  const [currentScene, setCurrentScene] = useState<Scene>('cafeteria');
  const [sceneKey, setSceneKey] = useState(0);
  const [inventoryItems, setInventoryItems] = useState<(string | null)[]>(() => [...inventory]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
 const [unlockedDoors, setUnlockedDoors] = useState<string[]>([]);

  const currentRoom = rooms[cameraIndex];

  // message
  useEffect(() => {
    if (!gameMessage) return;
    const timer = setTimeout(() => setGameMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [gameMessage]);

  const handleAction = (text: string) => setGameMessage(text);

  const handlePickup = (item: string) => {

    const isAlreadyInInventory = inventoryItems.some(slot => slot === item);

    if (isAlreadyInInventory) {
      handleAction("I already have this item in my bag.");
      return; 
    }
    addToInventory(item);
    setInventoryItems([...inventory]);
  };

  const handleSlotClick = (i: number) => {
    if (selectedSlot === null) {
      if (inventoryItems[i]) setSelectedSlot(i);
    } else if (selectedSlot === i) {
      setSelectedSlot(null);
    } else {
      // swap the two slots
      const next = [...inventoryItems];
      [next[selectedSlot], next[i]] = [next[i], next[selectedSlot]];
      inventory[selectedSlot] = next[selectedSlot];
      inventory[i] = next[i];
      setInventoryItems(next);
      setSelectedSlot(null);
    }
  };

  const handleUseItem = (slotIndex: number) => {
  const next = [...inventoryItems];
  next[slotIndex] = null;
  setInventoryItems(next);
  inventory[slotIndex] = null; 
  setSelectedSlot(null);
  };

  const handleZoom = (zoomId: string, zoomImageUrl?: string) => {
    setActiveZoom(zoomId);
    if (zoomImageUrl) {
      setZoomImage(zoomImageUrl);
    }
  };

  const navigateToScene = (destination: string) => {
    setCurrentScene(destination as Scene);
    setSceneKey(k => k + 1);
  };

  const navigate = (direction: 'prev' | 'next') => {
    setCameraIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : rooms.length - 1;
      }
      return prev < rooms.length - 1 ? prev + 1 : 0;
    });
  };

  // zoom in/out
  const renderRoom = () => {
    // hallway scene
    if (currentScene === 'hallway') {
      return (
        <Hallway
          onNavigate={navigateToScene}
          onAction={handleAction}
          onConsumeItem={(item) => {
            const slot = inventoryItems.indexOf(item);
            if (slot !== -1) handleUseItem(slot);
          }}
          onUnlock={(doorId) => setUnlockedDoors(prev => [...prev, doorId])}
          unlockedDoors={unlockedDoors}
          inventoryItems={inventoryItems}
        />
      );
    }

    // greenhouse scene
    if (currentScene === 'greenhouse') {
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#1a2e1a]">
          <p className="text-green-300 text-2xl font-bold tracking-widest">Greenhouse — Coming Soon</p>
          <button
            onClick={() => navigateToScene('hallway')}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full
                       hover:bg-white hover:text-black transition-all z-20"
          >
            BACK
          </button>
        </div>
      );
    }

    // lab scene
    if (currentScene === 'lab') {
      return (
        <Lab
          onNavigate={navigateToScene}
          onAction={handleAction}
          onPickup={handlePickup}
        />
      );
    }

    //closet scene
    if (currentScene === 'closet') {
      return (
        <Closet
          onNavigate={navigateToScene}
          onAction={handleAction}
          onPickup={handlePickup}
        />
      );
    }

    // bottles scene
    if (currentScene === 'bottles') {
      return (
        <Bottles
          onNavigate={navigateToScene}
          onAction={handleAction}
          onPickup={handlePickup}
          inventoryItems={inventoryItems}
          selectedSlot={selectedSlot}
        />
      );
    }

    // digital keypad zoom
    if (activeZoom === "digital_keypad") {
      return (
        <DigitalKeypad
          onBack={() => setActiveZoom(null)}
          onAction={handleAction}
          onPickup={handlePickup}
        />
      );
    }

    // zoom for objects
    if (activeZoom && zoomImage) {
      return (
        <div className="relative w-full h-full animate-in zoom-in-95 duration-300">
          <img
            src={zoomImage}
            className="w-full h-full object-contain bg-[#C2C5AA]"
            alt={`Zoom view - ${activeZoom}`}
          />
          <button
            onClick={() => {
              setActiveZoom(null);
              setZoomImage("");
            }}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full
                       hover:bg-white hover:text-black transition-all z-20"
          >
            BACK
          </button>
        </div>
      );
    }

    return (
      <Cafeteria
        unlockedDoors={unlockedDoors}
        onUnlock={(doorId) => {
          setUnlockedDoors(prev => [...prev, doorId]);
          if (doorId === 'closet_door') markCookQuestDone();
          if (selectedSlot !== null) handleUseItem(selectedSlot);
        }}
        roomVariant={currentRoom}
        onAction={handleAction}
        onZoom={handleZoom}
        onNavigate={navigateToScene}
        inventoryItems={inventoryItems}
        selectedSlot={selectedSlot}
      />
    );
  };

  const sceneTitles: Record<string, string> = {
  cafeteria: "Cafeteria",
  hallway: "Hallway",
  lab: "Science Laboratory",
  closet: "Storage Closet",
  bottles: "Bottle Rack",
  greenhouse: "Greenhouse",
  };

  return (
    <main className="flex flex-col pt-[2%] pb-[1%] items-center justify-center gap-2 
                    w-screen h-screen bg-black">
      <div className='relative items-center'>
        <h1 className="text-white text-2xl font-bold tracking-widest">
        {sceneTitles[currentScene]}
      </h1>
      </div>
      
      {/* rooms container */}
      <div className="relative w-[95vw] max-w-[1100px] aspect-video
                border border-gray-800 bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl">
        
        {/* message */}
        {gameMessage && (
          <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-[100] w-full 
                          bg-black/70 border border-gray-600 p-4 text-center 
                          animate-in fade-in">
            <p className="text-lg md:text-xl font-medium tracking-wide">
              {gameMessage}
            </p>
          </div>
        )}

        {/* draw room */}
        <div key={sceneKey} className="w-full h-full animate-scene-enter">
          {renderRoom()}
        </div>

        {/* navigation */ }
        {!activeZoom && currentScene === 'cafeteria' && (
          <>
            <button 
              onClick={() => navigate('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 
                         text-white/50 hover:text-white transition-all"
            >
              {"<"}
            </button>
            <button 
              onClick={() => navigate('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 
                         text-white/50 hover:text-white transition-all"
            >
              {">"}
            </button>
          </>
        )}
      </div>

      {/* Inventar */}
      <div className="flex items-center p-3 gap-4 w-fit max-w-[90%] h-[12%]
                      bg-gray-900/50 border border-gray-800 rounded-2xl overflow-x-auto">
        {inventoryItems.map((item, i) => {
          const isSelected = selectedSlot === i;
          return (
            <div
              key={i}
              onClick={() => handleSlotClick(i)}
              className={`aspect-square h-full flex-shrink-0 rounded-xl border transition-all
                ${item ? 'cursor-pointer' : 'cursor-default'}
                ${isSelected
                  ? 'border-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)] bg-gray-800/80'
                  : item
                    ? 'border-gray-500 hover:border-blue-400 bg-gray-800/80'
                    : 'border-gray-700 bg-gray-800/80'
                }`}
            >
              {item && (
                <img
                  src={item}
                  alt="inventory item"
                  className="w-full h-full object-contain p-1"
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MainPage;