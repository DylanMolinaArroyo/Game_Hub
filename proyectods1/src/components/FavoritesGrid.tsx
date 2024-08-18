import { SimpleGrid, Heading, Icon, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../firestore";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import { Game } from "../hooks/useGames";
import GameCardSkeleton from "./GameCardSkeleton";
import { TbMoodCry } from "react-icons/tb";

interface Props {
  updateFavorites: (message: string, status: "success" | "error") => void;
}

const FavoritesGrid = ({ updateFavorites }: Props) => {
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
      setIsLoading(false);
    };

    fetchFavorites();
  }, [updateFavorites]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(
        favoriteGames.filter((favGame) => favGame.id !== game.id)
      );
      updateFavorites(`${game.name} removed from favorites!`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      updateFavorites(`${game.name} added to favorites!`, "success");
    }
  };

  if (isLoading) {
    return (
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <GameCardContainer key={index}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
      </SimpleGrid>
    );
  }

  if (favoriteGames.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        textAlign="center"
      >
        <Heading as="h1" size="lg" paddingY={5}>
          No favorites yet!
        </Heading>
        <Icon as={TbMoodCry} boxSize={20} />
      </Flex>
    );
  }

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {favoriteGames.map((game) => (
        <GameCardContainer
          key={game.id}
          onFavoriteClick={() => toggleFavorite(game)}
          isFavorite={true}
        >
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default FavoritesGrid;
