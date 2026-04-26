import { Box, SimpleGrid, Text, Flex, Heading, Icon } from "@chakra-ui/react";
import useGames from "../../../hooks/useGames";
import GameCard from "../GameCard";
import GameCardSkeleton from "../GameCardSkeleton";
import GameCardContainer from "../GameCardContainer";
import { memo, useEffect, useMemo, useState } from "react";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../../../services/firestore";
import { Game } from "../../../hooks/useGames";
import { TbMoodCry } from "react-icons/tb";
import { t } from "i18next";
import { Props } from "./GameGrid.types";

const GameGrid = memo(function GameGrid({
  gameQuery,
  onFavoriteChange,
  page,
  onTotalPagesChange,
}: Props) {
  const { data, error, isLoading, totalPages } = useGames(gameQuery, page);
  const skeletonCount = isLoading ? Array(8).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    getFavorites().then(setFavoriteGames);
  }, []);

  useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const favoriteIds = useMemo(
    () => new Set(favoriteGames.map((g) => g.id)),
    [favoriteGames],
  );

  const toggleFavorite = async (game: Game) => {
    if (favoriteIds.has(game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(favoriteGames.filter((g) => g.id !== game.id));
      onFavoriteChange(`${game.name} ${t("removed_from_favorites.message")}`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(`${game.name} ${t("added_to_favorites.message")}`, "success");
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
        <Text color="text.error" mt={4}>
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
            isFavorite={favoriteIds.has(game.id)}
          >
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </Box>
  );
});

export default GameGrid;
