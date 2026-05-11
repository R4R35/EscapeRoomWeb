export interface Glass {
  id: number;
  capacity: number;
  amount: number;
}

// Module-level: persists for the entire browser session across scene changes.
export const glassesState: Glass[] = [
  { id: 0, capacity: 10, amount: 0 },
  { id: 1, capacity: 6,  amount: 6 },
  { id: 2, capacity: 5,  amount: 5 },
];

export let puzzleSolved = false;
export const markPuzzleSolved = () => { puzzleSolved = true; };

export const inventory: (string | null)[] = Array(8).fill(null);
export const addToInventory = (item: string) => {
  const slot = inventory.indexOf(null);
  if (slot !== -1) inventory[slot] = item;
};

export const removeFromInventory = (slotIndex: number) => {
  inventory[slotIndex] = null;
};