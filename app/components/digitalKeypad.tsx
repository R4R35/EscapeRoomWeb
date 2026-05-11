'use client'
import React, { useState } from 'react'
import { DigitalKeypadProps } from '../types'

const CORRECT_CODE_CLOSET = "1405";
const BUTTONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "DEL", "0", "OK"] as const;

type Button = typeof BUTTONS[number];

const DigitalKeypad: React.FC<DigitalKeypadProps> = ({ onBack, onAction, onPickup }) => {
  const [code, setCode] = useState("");

  const handlePress = (num: string) => {
    if (code.length >= 4) return;
    
    const newCode = code + num;
    setCode(newCode);
  };

  const handleClear = () => setCode("");

  const handleOk = () => {
  if (code === CORRECT_CODE_CLOSET) {
    onAction("You got the key to the closet!");
    onPickup("Cafeteria/closet_key.png"); 
  } else {
    onAction("Wrong code!");
    handleClear();
  }
};

  const handleButtonClick = (btn: Button) => {
    switch (btn) {
      case 'DEL': return handleClear();
      case 'OK': return handleOk();
      default: return handlePress(btn);
    }
  };

  const getButtonStyle = (btn: Button): string => {
    const baseStyle = "aspect-square rounded-lg border-b-4 border-r-4 border-black " +
                      "active:border-0 active:translate-y-1 active:translate-x-1 " +
                      "text-xl font-bold transition-all flex items-center justify-center";
    
    if (btn === 'DEL') return `${baseStyle} bg-orange-700 text-white hover:brightness-110`;
    if (btn === 'OK') return `${baseStyle} bg-green-700 text-white hover:brightness-110`;
    return `${baseStyle} bg-gray-500 text-gray-900 hover:brightness-110`;
  };

  return (
    <div className="relative w-full h-full bg-[#c2c0a8] flex items-center justify-center p-4">
      <div className="w-[300px] bg-[#3a3a3a] border-4 border-black p-6 shadow-2xl 
                      flex flex-col items-center gap-6">
        
        <div className="w-full h-24 bg-[#1a1a1a] border-4 border-gray-600 rounded-lg 
                        flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10" />
          <span className="text-green-500 font-mono text-3xl tracking-[10px]">
            {code.padEnd(4, "_")}
          </span>
          <div className="text-green-900 text-[10px] mt-1 uppercase font-bold">
            Security System v4.9
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full">
          {BUTTONS.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={getButtonStyle(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        <button 
          onClick={onBack}
          className="mt-2 text-gray-400 hover:text-white uppercase text-xl font-bold tracking-widest"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default DigitalKeypad;