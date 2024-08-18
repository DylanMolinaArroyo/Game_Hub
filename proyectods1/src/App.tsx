import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Show,
  SlideFade,
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
import PageTurner from "./components/PageTurner";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [page, setPage] = useState(1);
  const [, setUpdateKey] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<"success" | "error">(
    "success"
  );
  const [totalPages, setTotalPages] = useState(0);

  const handleClearFilters = () => {
    setGameQuery({
      genre: null,
      platform: null,
      sortOrder: "",
      searchText: "",
    });
  };

  const handleFavoriteChange = (
    message: string,
    status: "success" | "error"
  ) => {
    setUpdateKey((prevKey) => prevKey + 1);
    setAlertMessage(message);
    setAlertStatus(status);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const isFilterApplied =
    gameQuery.genre ||
    gameQuery.platform ||
    gameQuery.sortOrder ||
    gameQuery.searchText;

  return (
    <Grid
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
              <Text paddingX={2}>Favorites</Text>
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
                      <Box marginLeft="auto">
                        <ClearFiltersButton onClick={handleClearFilters} />
                      </Box>
                    )}
                    <Box
                      position="absolute"
                      left="50%"
                      transform="translateX(-50%)"
                      bottom="1"
                      top="0"
                      zIndex={1}
                    >
                      <PageTurner
                        page={page}
                        totalPages={totalPages}
                        onPreviousPage={() =>
                          setPage((prevPage) => prevPage - 1)
                        }
                        onNextPage={() => setPage((prevPage) => prevPage + 1)}
                      />
                    </Box>
                  </Flex>
                </Box>

                <GameGrid
                  gameQuery={gameQuery}
                  page={page}
                  setPage={setPage}
                  onFavoriteChange={handleFavoriteChange}
                  onTotalPagesChange={setTotalPages}
                />
                <Box
                  position="absolute"
                  justifyContent="center"
                  alignItems="center"
                  left="50%"
                  transform="translateX(-50%)"
                >
                  <PageTurner
                    page={page}
                    totalPages={totalPages}
                    onPreviousPage={() => setPage((prevPage) => prevPage - 1)}
                    onNextPage={() => setPage((prevPage) => prevPage + 1)}
                  />
                </Box>
              </GridItem>
            </TabPanel>
            <TabPanel>
              <Heading as="h1" marginY={5} fontSize="5xl" paddingLeft={2}>
                Favorite games
              </Heading>
              <FavoritesGrid updateFavorites={handleFavoriteChange} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Show>
      {alertMessage && (
        <Box position="fixed" bottom="20px" right="20px" zIndex={1000}>
          <SlideFade in={!!alertMessage} offsetY="20px">
            <Alert
              status={alertStatus}
              bg={alertStatus === "success" ? "green.500" : "red.500"}
              color="white"
              opacity={0.9}
              borderRadius="md"
              boxShadow="lg"
            >
              <AlertIcon />
              {alertMessage}
            </Alert>
          </SlideFade>
        </Box>
      )}
    </Grid>
  );
}

export default App;
