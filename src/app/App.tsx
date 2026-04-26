import {
  Alert,
  AlertIcon,
  Box,
  Grid,
  GridItem,
  Icon,
  SlideFade,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Platform } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import NavBar from "../components/NavBar";
import BrowseTab from "../components/BrowseTab";
import FavoritesTab from "../components/FavoritesTab";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<"success" | "error">(
    "success",
  );

  const handleFavoriteChange = useCallback(
    (message: string, status: "success" | "error") => {
      setAlertMessage(message);
      setAlertStatus(status);
      setTimeout(() => setAlertMessage(null), 3000);
    },
    [],
  );

  const { t } = useTranslation();

  return (
    <Grid templateAreas='"nav" "main"' templateColumns="1fr">
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="main">
        <Tabs variant="brand">
          <TabList>
            <Tab>
              <Icon as={FaHome} boxSize={4} />
              General
            </Tab>
            <Tab>
              <Icon as={FaHeart} boxSize={4} />
              {t("favorites.message")}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <BrowseTab onFavoriteChange={handleFavoriteChange} />
            </TabPanel>

            <TabPanel>
              <FavoritesTab onFavoriteChange={handleFavoriteChange} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>

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
