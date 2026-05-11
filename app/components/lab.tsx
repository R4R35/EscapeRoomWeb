'use client'
import React, { useState } from 'react'
import LabTable from './labTable'
import { puzzleSolved } from '../gameState'

interface LabProps {
  onNavigate: (destination: string) => void;
  onAction: (text: string) => void;
  onPickup: (item: string) => void;
}

type LabView = null | 'table';

const LAB_SCENES = [
  {
    background: 'Lab/lab1.png',
    interactiveElements: [
      {
        id: 'glasses',
        position: 'top-[34%] left-[37%] w-[19%] h-[30%]',
        view: 'table' as LabView,
      },
    ],
  },
];

const Lab: React.FC<LabProps> = ({ onNavigate, onAction, onPickup }) => {
  const [sceneIndex] = useState(0);
  const [activeView, setActiveView] = useState<LabView>(null);
  const scene = LAB_SCENES[sceneIndex];

  if (activeView === 'table') {
    return <LabTable onBack={() => setActiveView(null)} onAction={onAction} onPickup={onPickup} />;
  }

  return (
    <div className="relative w-full h-full bg-black">
      {scene.background && (
        <img
          src={sceneIndex === 0 && puzzleSolved ? 'Lab/No10.png' : scene.background}
          alt={`Lab scene ${sceneIndex + 1}`}
          className="absolute inset-0 w-full h-full object-fill"
        />
      )}

      {scene.interactiveElements.map(el => (
        <button
          key={el.id}
          onClick={() => el.view ? setActiveView(el.view) : undefined}
          className={`absolute bg-transparent ${el.position} cursor-pointer hover:brightness-110 transition-all`}
        />
      ))}

      <button
        onClick={() => onNavigate('hallway')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white
                   px-6 py-2 rounded-lg hover:bg-gray-700 transition-all text-sm"
      >
        ← Back to Hallway
      </button>
    </div>
  );
};

export default Lab;
