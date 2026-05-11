'use client'
import React, { useState, useEffect, useRef } from 'react'
import { glassesState, puzzleSolved, markPuzzleSolved } from '../gameState'

interface LabTableProps {
  onBack: () => void;
  onAction: (text: string) => void;
  onPickup: (item: string) => void;
}

const POUR_DURATION = 1200 // ms for a full 8-unit transfer
const TICK_MS = 16        // ~60 fps

const LabTable: React.FC<LabTableProps> = ({ onBack, onAction, onPickup }) => {
  // displayAmounts drives the visuals; starts from current global state.
  const displayRef = useRef<number[]>(glassesState.map(g => g.amount))
  const [displayAmounts, setDisplayAmounts] = useState<number[]>(() =>
    glassesState.map(g => g.amount)
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [isPouring, setIsPouring] = useState(false)
  const [solved, setSolved] = useState(puzzleSolved)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => {
    if (timerRef.current !== null) clearInterval(timerRef.current)
  }, [])

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const pour = (fromIdx: number, toIdx: number) => {
    const from = glassesState[fromIdx]
    const to = glassesState[toIdx]
    const transfer = Math.min(from.amount, to.capacity - to.amount)

    if (transfer === 0) {
      onAction(to.amount === to.capacity ? 'That glass is already full!' : 'Nothing to pour!')
      setSelected(null)
      return
    }

    const finalFrom = from.amount - transfer
    const finalTo = to.amount + transfer

    // Commit to global state immediately so navigation preserves end state.
    glassesState[fromIdx].amount = finalFrom
    glassesState[toIdx].amount = finalTo

    const startFrom = displayRef.current[fromIdx]
    const startTo = displayRef.current[toIdx]
    // Scale duration to the actual transfer amount for consistent pour speed.
    const duration = (transfer / 8) * POUR_DURATION
    const startTime = performance.now()

    setIsPouring(true)
    stopTimer()

    timerRef.current = setInterval(() => {
      const t = Math.min((performance.now() - startTime) / duration, 1)
      // Ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const next = [...displayRef.current]
      next[fromIdx] = startFrom + (finalFrom - startFrom) * eased
      next[toIdx]   = startTo   + (finalTo   - startTo)   * eased
      displayRef.current = next
      setDisplayAmounts([...next])

      if (t >= 1) {
        stopTimer()
        setIsPouring(false)
        setSelected(null)
        if (glassesState[0].amount === 8) {
          markPuzzleSolved()
          setSolved(true)
          onPickup('Lab/g10.png')
        }
      }
    }, TICK_MS)
  }

  const handleClick = (idx: number) => {
    if (isPouring) return

    if (selected === null) {
      if (glassesState[idx].amount === 0) return
      setSelected(idx)
    } else if (selected === idx) {
      setSelected(null)
    } else {
      pour(selected, idx)
    }
  }

  return (
    <div className="relative w-full h-full animate-scene-enter">
      <img
        src={solved ? 'Lab/no10.png' : 'Lab/table.png'}
        alt="Lab table close-up"
        className="absolute inset-0 w-full h-full object-fill"
      />

      {/* Glass slots — hidden once puzzle is solved */}
      {!solved && (() => {
        const positions = [
          'left-[28%] bottom-[9%]',  // 10L big bottle
          'left-[55%] bottom-[9%]',  // 6L bottle
          'left-[43%] bottom-[9%]',  // 5L bottle
        ]
        return glassesState.map((glass, idx) => {
          const fillPct = Math.min((displayAmounts[idx] / glass.capacity) * 100, 100)
          const isSelected = selected === idx

          return (
            <div key={glass.id} className={`absolute ${positions[idx]} flex flex-col items-center gap-1 select-none -translate-x-1/2`}>
              {/* Amount label */}
              <span className="text-white font-bold text-sm tabular-nums px-1 rounded bg-black/70 drop-shadow-lg">
                {displayAmounts[idx].toFixed(1)} / {glass.capacity}L
              </span>

              {/* Glass vessel — square, click target */}
              <div
                onClick={() => handleClick(idx)}
                className={`relative w-14 h-14 rounded-md overflow-hidden transition-shadow duration-150 bg-black ${
                  isPouring ? 'cursor-wait' : 'cursor-pointer'
                } ${
                  isSelected
                    ? 'shadow-[0_0_0_3px_#facc15,0_0_16px_4px_rgba(250,204,21,0.5)]'
                    : 'shadow-[0_0_0_2px_rgba(255,255,255,0.45)] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.8)]'
                }`}
              >
                {/* Water fill */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400"
                  style={{ height: `${fillPct}%` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/30" />
                </div>

                {/* Capacity ticks */}
                {Array.from({ length: glass.capacity - 1 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px bg-white/15"
                    style={{ bottom: `${((i + 1) / glass.capacity) * 100}%` }}
                  />
                ))}
              </div>

              {/* Capacity label */}
              <span className="text-white text-xs px-1 rounded bg-black/70">cap: {glass.capacity}L</span>
            </div>
          )
        })
      })()}

      <button
        onClick={onBack}
        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full
                   hover:bg-white hover:text-black transition-all z-20"
      >
        BACK
      </button>
    </div>
  )
}

export default LabTable
