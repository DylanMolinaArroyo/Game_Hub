import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../app/App";
import { useEffect, useState } from "react";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../services/firestore";
import { Game } from "../hooks/useGames";
import { TbMoodCry } from "react-icons/tb";
import { t } from "i18next";

interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onTotalPagesChange: (totalPages: number) => void;
}

const GameGrid = ({
  gameQuery,
  onFavoriteChange,
  page,
  onTotalPagesChange,
}: Props) => {
  const { data, error, isLoading, totalPages } = useGames(gameQuery, page);
  const skeletonCount = isLoading ? Array(8).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const errorTextColor = useColorModeValue("red.800", "red.300");

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, [onFavoriteChange]);

  useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(
        favoriteGames.filter((favGame) => favGame.id !== game.id),
      );
      onFavoriteChange(
        `${game.name} ${t("removed_from_favorites.message")}`,
        "error",
      );
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(
        `${game.name} ${t("added_to_favorites.message")}`,
        "success",
      );
    }
  };

  if (error) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        textAlign="center"
        padding={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading as="h1" size="lg" paddingY={5}>
          Something went wrong
        </Heading>
        <Icon as={TbMoodCry} boxSize={20} />
        <Text color={errorTextColor} mt={4}>
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Box>
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
    </Box>
  );
};

export default GameGrid;
