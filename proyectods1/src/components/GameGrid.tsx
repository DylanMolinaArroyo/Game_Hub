import { Text, SimpleGrid, Button, Icon } from "@chakra-ui/react";
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
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletonCount = isLoading ? Array(20).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (gameId: string) => {
    if (favoriteGames.includes(gameId)) {
      await removeFromFavorites(gameId);
      setFavoriteGames(favoriteGames.filter((id) => id !== gameId));
    } else {
      await addToFavorites(gameId);
      setFavoriteGames([...favoriteGames, gameId]);
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
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
          <Button
            position="absolute"
            top={2}
            right={2}
            onClick={() => toggleFavorite(game.id.toString())}
          >
            <Icon
              as={
                favoriteGames.includes(game.id.toString())
                  ? FaHeart
                  : FaRegHeart
              }
              color="red.400"
              boxSize={7}
            />
          </Button>
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
