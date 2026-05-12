'use client'
import React from 'react'

const Win: React.FC = () => {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center animate-in zoom-in duration-1000">
      <img
        src="/BotanicGarden/youwon.png" // <--- AICI E MODIFICAREA
        className="w-[80%] h-[80%] object-contain drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]"
        alt="You Won!"
      />
      
      {/* Optional: Un buton de restart joc */}
      <button 
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-3 bg-gray-800 text-white font-bold rounded-lg border border-gray-600 hover:bg-gray-700 hover:border-yellow-400 transition-all z-50"
      >
        Play Again
      </button>
    </div>
  );
};

export default Win;