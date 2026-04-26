import { GameQuery } from "../../../app/App";

export interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
  page: number;
  onTotalPagesChange: (totalPages: number) => void;
}
