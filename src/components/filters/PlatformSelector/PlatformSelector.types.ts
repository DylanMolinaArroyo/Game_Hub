import { Platform } from "../../../hooks/useGames";

export interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}
