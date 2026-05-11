// types.ts
export interface InteractiveElement {
  id: string;
  position: string;
  image: string;
  action?: string;
  zoomTarget?: string;
  zoomImage?: string; // pentru zoom custom
  navigateTo?: string; // pentru navigare intre scene (ex: hallway)
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
  onNavigate?: (destination: string) => void; // pentru tranzitii intre scene
}

export interface DigitalKeypadProps {
  onBack: () => void;
  onAction: (text: string) => void;
}