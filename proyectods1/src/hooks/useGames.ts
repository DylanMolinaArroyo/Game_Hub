//----------------Original--------------------------------------
/*import useData from "./useData";
import { GameQuery } from "../App";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
  }
  
  
const useGames = (gameQuery: GameQuery) => 
  useData <Game>(
    '/games', 
    {
    params: {
      genres: gameQuery.genre?.id, 
      platforms: gameQuery.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText
    }
  },
    [gameQuery] 
  );
    
export default useGames;*/

//------------------------------------------------------

import useData from "./useData";
import { GameQuery } from "../App";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: Platform}[];
    metacritic: number;
  }

  const useGames = (gameQuery: GameQuery, page: number) => 
    useData<Game>(
      '/games', 
      {
        params: {
          genres: gameQuery.genre?.id, 
          platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: page, 
          page_size: 20 
        }
      },
      [gameQuery, page] 
    );
  
  export default useGames;

