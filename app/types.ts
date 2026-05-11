  export type Scene = 'cafeteria' | 'hallway' | 'lab' | 'closet';
  
  export interface InteractiveElement {
    id: string;
    position: string;
    image?: string;
    action?: string;
    zoomTarget?: string;
    zoomImage?: string; 
    navigateTo?: Scene;
  }

  export interface RoomConfig {
    background: string;
    interactiveElements: InteractiveElement[];
  }

  export interface RoomConfigs {
    [key: string]: RoomConfig;
  }

  export interface CafeteriaProps {
    roomVariant: string;
    onAction: (text: string) => void;
    onZoom: (zoomId: string, zoomImage?: string) => void;
    onNavigate?: (destination: Scene) => void;
    inventoryItems: (string | null)[]; 
    selectedSlot: number | null;
    unlockedDoors: string[];
    onUnlock: (doorId: string) => void;
  }

  export interface DigitalKeypadProps {
    onBack: () => void;
    onAction: (text: string) => void;
    onPickup: (item: string) => void;
  }

  export interface DigitalKeypadProps {
    onBack: () => void;
    onAction: (text: string) => void;
    onPickup: (item: string) => void;
  }

  export interface ClosetProps {
  onNavigate: (destination: Scene) => void;
  onAction: (text: string) => void;
  onPickup: (item: string) => void; 
}