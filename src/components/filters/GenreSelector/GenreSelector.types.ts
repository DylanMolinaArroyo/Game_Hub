import { Genre } from "../../../hooks/useGenres";

export interface Props {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre | null) => void;
}
