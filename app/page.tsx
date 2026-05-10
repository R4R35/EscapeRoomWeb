'use client'
import React, { useState, useEffect } from 'react'
import Cafeteria from './components/cafeteria'
import DigitalKeypad from './components/digitalKeypad'

const rooms = ['cafeteria_1', 'cafeteria_2'] as const;

const MainPage = () => {
  const [cameraIndex, setCameraIndex] = useState(0);
  const [gameMessage, setGameMessage] = useState("");
  const [activeZoom, setActiveZoom] = useState<string | null>(null);
  const [zoomImage, setZoomImage] = useState<string>("");

  const currentRoom = rooms[cameraIndex];

  // message
  useEffect(() => {
    if (!gameMessage) return;
    const timer = setTimeout(() => setGameMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [gameMessage]);

  const handleAction = (text: string) => setGameMessage(text);

  const handleZoom = (zoomId: string, zoomImageUrl?: string) => {
    setActiveZoom(zoomId);
    if (zoomImageUrl) {
      setZoomImage(zoomImageUrl);
    }
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
    // digital keypad zoom
    if (activeZoom === "digital_keypad") {
      return (
        <DigitalKeypad 
          onBack={() => setActiveZoom(null)} 
          onAction={handleAction} 
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

    // normal
    return (
      <Cafeteria 
        roomVariant={currentRoom} 
        onAction={handleAction} 
        onZoom={handleZoom} 
      />
    );
  };

  return (
    <main className="flex flex-col pt-[2%] pb-[1%] items-center justify-center gap-2 
                    w-screen h-screen bg-black">
      <div className='relative items-center'>
        <h1 className="text-white text-2xl font-bold">Cafeteria</h1>
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

        {/* draw camera */}
        {renderRoom()}

        {/* navigation */}
        {!activeZoom && (
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
        {Array.from({ length: 8 }, (_, i) => (
          <div 
            key={i} 
            className="aspect-square h-full flex-shrink-0 bg-gray-800/80 rounded-xl 
                       border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
          />
        ))}
      </div>
    </main>
  );
};

export default MainPage;