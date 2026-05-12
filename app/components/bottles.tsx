'use client'
import React, { useState } from 'react'
import { bottleCounters, bottlePuzzleSolved, markBottlePuzzleSolved } from '../gameState'
import { Scene } from '../types'

const SOLUTION = [1, 9, 0, 7, 1, 0, 1, 8, 0, 5]
const KEY_ITEM = 'Cafeteria/hallway_key.png'

interface BottlesProps {
  onNavigate: (destination: Scene) => void;
  onAction: (text: string) => void;
  onPickup: (item: string) => void;
  inventoryItems: (string | null)[];
  selectedSlot: number | null;
}

const Bottles: React.FC<BottlesProps> = ({ onNavigate, onAction, onPickup, inventoryItems, selectedSlot }) => {
  const [counters, setCounters] = useState<number[]>(() => [...bottleCounters])

  const handleBottleClick = (idx: number) => {
    const selectedItem = selectedSlot !== null ? inventoryItems[selectedSlot] : null
    if (selectedItem !== 'Lab/g10.png') {
      return
    }
    bottleCounters[idx] = (bottleCounters[idx] + 1) % 10
    const next = [...counters]
    next[idx] = bottleCounters[idx]
    setCounters(next)

    if (!bottlePuzzleSolved && next.every((v, i) => v === SOLUTION[i])) {
      markBottlePuzzleSolved()
      onPickup(KEY_ITEM)
      onAction('The bottles click into place — a small token falls out!')
    }
  }

  return (
    <div className="relative w-full h-full">
      <img
        src="Closet/bottles.png"
        alt="Bottles"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/* 10 counter buttons — single row */}
      <div className="absolute inset-0 flex items-center justify-center gap-4">
        {Array.from({ length: 10 }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handleBottleClick(idx)}
            className="w-12 h-12 rounded-md bg-black/70 border-2 border-white/40
                       hover:border-white text-white font-bold text-lg
                       flex items-center justify-center transition-all
                       hover:bg-black/90 select-none"
          >
            {counters[idx]}
          </button>
        ))}
      </div>

      <button
        onClick={() => onNavigate('closet')}
        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full
                   hover:bg-white hover:text-black transition-all z-20"
      >
        BACK
      </button>
    </div>
  )
}
//blue chips, red chips, big bottle, orange chips, water
//1 9 0 7 1 0 1 8 0 5
export default Bottles
