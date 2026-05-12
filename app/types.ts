  export type Scene = 'cafeteria' | 'hallway' | 'lab' | 'closet' | 'bottles' | 'greenhouse';
  
  export interface InteractiveElement {
    id: string;
    position: string;
    image?: string;
    action?: string;
    zoomTarget?: string;
    zoomImage?: string;
    navigateTo?: Scene;
    buttonStyle?: string;
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

  export interface VisibleElements {
    boxes_up: boolean;
    box_right: boolean;
    open_box: boolean;
    pahare: boolean;
    closet_key: boolean;
  }

  export interface ClosetProps {
  onNavigate: (destination: Scene) => void;
  onAction: (text: string) => void;
  onPickup: (item: string) => void; 
  itemsState: VisibleElements;
  setItemsState: React.Dispatch<React.SetStateAction<VisibleElements>>;
}


