import { Text, SimpleGrid } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import { useEffect, useState } from "react";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../firestore";
import { Game } from "../hooks/useGames";

interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
}

const GameGrid = ({ gameQuery, onFavoriteChange }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletonCount = isLoading ? Array(20).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, [onFavoriteChange]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(
        favoriteGames.filter((favGame) => favGame.id !== game.id)
      );
      onFavoriteChange(`${game.name} removed from favorites!`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(`${game.name} added to favorites!`, "success");
    }
  };

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {isLoading &&
        skeletonCount.map((_, index) => (
          <GameCardContainer key={index}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      {data.map((game) => (
        <GameCardContainer
          key={game.id}
          onFavoriteClick={() => toggleFavorite(game)}
          isFavorite={favoriteGames.some((favGame) => favGame.id === game.id)}
        >
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
