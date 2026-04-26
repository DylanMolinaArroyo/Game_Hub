import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { GameQuery } from "../app/App";
import { Platform } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";
import i18n from "../config/i18n";
import GameHeading from "./GameHeading";
import SearchInput from "./SearchInput";
import GenreSelector from "./GenreSelector";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import ClearFiltersButton from "./ClearFiltersButton";
import GameGrid from "./GameGrid";
import PageTurner from "./PageTurner";

interface Props {
  onFavoriteChange: (message: string, status: "success" | "error") => void;
}

const BrowseTab = ({ onFavoriteChange }: Props) => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleClearFilters = () => {
    setGameQuery({
      genre: null,
      platform: null,
      sortOrder: "",
      searchText: "",
    });
    setPage(1);
  };

  const isFilterApplied =
    gameQuery.genre ||
    gameQuery.platform ||
    gameQuery.sortOrder ||
    gameQuery.searchText;

  return (
    <>
      <Box paddingX={{ base: 2, md: 4 }}>
        <GameHeading gameQuery={gameQuery} targetLanguage={i18n.language} />
        <Box marginBottom={3}>
          <SearchInput
            onSearch={(searchText) => {
              setGameQuery({ ...gameQuery, searchText });
              setPage(1);
            }}
          />
        </Box>
        <Flex gap={3} flexWrap="wrap" marginBottom={6} alignItems="center">
          <GenreSelector
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre: Genre | null) => {
              setGameQuery({ ...gameQuery, genre });
              setPage(1);
            }}
          />
          <PlatformSelector
            selectedPlatform={gameQuery.platform}
            onSelectPlatform={(platform: Platform | null) => {
              setGameQuery({ ...gameQuery, platform });
              setPage(1);
            }}
          />
          <SortSelector
            sortOrder={gameQuery.sortOrder}
            onSelectSortOrder={(sortOrder) => {
              setGameQuery({ ...gameQuery, sortOrder });
              setPage(1);
            }}
          />
          {isFilterApplied && (
            <ClearFiltersButton onClick={handleClearFilters} />
          )}
        </Flex>
      </Box>

      <GameGrid
        gameQuery={gameQuery}
        page={page}
        onFavoriteChange={onFavoriteChange}
        onTotalPagesChange={setTotalPages}
      />

      <Flex justifyContent="center" mt={4} mb={6}>
        <PageTurner
          page={page}
          totalPages={totalPages}
          onPreviousPage={() => setPage((p) => p - 1)}
          onNextPage={() => setPage((p) => p + 1)}
        />
      </Flex>
    </>
  );
};

export default BrowseTab;
