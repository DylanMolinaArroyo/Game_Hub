import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import ClearFiltersButton from "./components/ClearFiltersButton";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import FavoritesGrid from "./components/FavoritesGrid";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [, setUpdateKey] = useState(0);

  const handleClearFilters = () => {
    setGameQuery({
      genre: null,
      platform: null,
      sortOrder: "",
      searchText: "",
    });
  };

  const handleFavoriteChange = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  const isFilterApplied =
    gameQuery.genre ||
    gameQuery.platform ||
    gameQuery.sortOrder ||
    gameQuery.searchText;

  return (
    //<h1>You are currently logged in.</h1>

    <Grid
      //<h1>You are currently logged in.</h1>
      templateAreas={{
        base: '"nav" "main"',
        lg: '"nav nav" "aside main"',
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
        <Tabs variant="soft-rounded">
          <TabList paddingLeft={5} whiteSpace="normal">
            <Tab>
              <Icon as={FaHome} boxSize={5} />
              <Text paddingX={2}>General</Text>
            </Tab>
            <Tab>
              <Icon as={FaHeart} boxSize={5} />
              <Text paddingX={2}>Favoritos</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GridItem area="main">
                <Box paddingLeft={2}>
                  <GameHeading gameQuery={gameQuery} />
                  <Flex marginBottom={5} position="relative">
                    <Box marginRight={5}>
                      <PlatformSelector
                        selectedPlatform={gameQuery.platform}
                        onSelectPlatform={(platform) =>
                          setGameQuery({ ...gameQuery, platform })
                        }
                      />
                    </Box>
                    <SortSelector
                      sortOrder={gameQuery.sortOrder}
                      onSelectSortOrder={(sortOrder) =>
                        setGameQuery({ ...gameQuery, sortOrder })
                      }
                    />
                    {isFilterApplied && (
                      <Box marginLeft={1110} position="absolute">
                        <ClearFiltersButton onClick={handleClearFilters} />
                      </Box>
                    )}
                  </Flex>
                </Box>
                <GameGrid gameQuery={gameQuery} />
              </GridItem>
            </TabPanel>
            <TabPanel>
              <FavoritesGrid gameQuery={gameQuery} />
              Hola
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Show>
    </Grid>
  );
}

export default App;
