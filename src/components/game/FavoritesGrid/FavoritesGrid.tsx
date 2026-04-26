import { SimpleGrid, Heading, Icon, Flex } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../../../services/firestore";
import GameCard from "../GameCard";
import GameCardContainer from "../GameCardContainer";
import { Game } from "../../../hooks/useGames";
import GameCardSkeleton from "../GameCardSkeleton";
import { TbMoodCry } from "react-icons/tb";
import { Props } from "./FavoritesGrid.types";

const FavoritesGrid = memo(function FavoritesGrid({ updateFavorites }: Props) {
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    getFavorites().then((favorites) => {
      setFavoriteGames(favorites);
      setIsLoading(false);
    });
  }, []);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((g) => g.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(favoriteGames.filter((g) => g.id !== game.id));
      updateFavorites(`${game.name} ${t("removed_from_favorites.message")}`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      updateFavorites(`${game.name} ${t("added_to_favorites.message")}`, "success");
    }
  };

  if (isLoading) {
    return (
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {Array(8)
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
          {t("no_favorites_yet.message")}
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
});

export default FavoritesGrid;
