import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { FavoritesGrid } from "../../game";
import { Props } from "./FavoritesTab.types";


const FavoritesTab = ({ onFavoriteChange }: Props) => {
  const { t } = useTranslation();

  return (
    <Box paddingX={{ base: 2, md: 4 }}>
      <Heading
        as="h1"
        marginY={5}
        fontSize={{ base: "3xl", md: "5xl" }}
        paddingLeft={2}
      >
        {t("favorite_games.message")}
      </Heading>
      <FavoritesGrid updateFavorites={onFavoriteChange} />
    </Box>
  );
};

export default FavoritesTab;
