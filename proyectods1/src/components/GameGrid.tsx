/*import { Text, SimpleGrid } from "@chakra-ui/react";
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
import { Game } from "../hooks/useGames";

interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
}

const GameGrid = ({ gameQuery, onFavoriteChange }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery, 2);
  const skeletonCount = isLoading ? Array(20).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, [onFavoriteChange]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(
        favoriteGames.filter((favGame) => favGame.id !== game.id)
      );
      onFavoriteChange(`${game.name} removed from favorites!`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(`${game.name} added to favorites!`, "success");
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
        <GameCardContainer
          key={game.id}
          onFavoriteClick={() => toggleFavorite(game)}
          isFavorite={favoriteGames.some((favGame) => favGame.id === game.id)}
        >
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;*/

//----------------------------------------------------------------------------------

/*import { Text, SimpleGrid, Button, Box } from "@chakra-ui/react";
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
import { Game } from "../hooks/useGames";

interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const GameGrid = ({ gameQuery, onFavoriteChange, page, setPage }: Props) => {
  const { data, error, isLoading, totalPages } = useGames(gameQuery, page);
  const skeletonCount = isLoading ? Array(20).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, [onFavoriteChange]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(
        favoriteGames.filter((favGame) => favGame.id !== game.id)
      );
      onFavoriteChange(`${game.name} removed from favorites!`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(`${game.name} added to favorites!`, "success");
    }
  };

  if (error) return <Text>{error}</Text>;

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
      {page < totalPages && (
        <Button
          onClick={() => setPage(page + 1)}
          isLoading={isLoading}
          marginTop={4}
          colorScheme="teal"
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default GameGrid;*/

//------------------------------------------------------------------------------

/*import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import { useEffect, useState } from "react";
import { addToFavorites, getFavorites, removeFromFavorites } from "../firestore";
import { Game } from "../hooks/useGames";

interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
  page: number; // Agrega page a las props
  setPage: React.Dispatch<React.SetStateAction<number>>; // Agrega setPage a las props
}

const GameGrid = ({ gameQuery, onFavoriteChange, page, setPage }: Props) => {
  const { data, error, isLoading, totalPages } = useGames(gameQuery, page);
  const skeletonCount = isLoading ? Array(20).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, [onFavoriteChange]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(favoriteGames.filter((favGame) => favGame.id !== game.id));
      onFavoriteChange(`${game.name} removed from favorites!`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(`${game.name} added to favorites!`, "success");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (error) return <Text>{error}</Text>;

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
      <Flex justifyContent="space-between" padding="10px">
        <Button onClick={handlePreviousPage} isDisabled={page === 1}>
          Anterior
        </Button>
        <Button onClick={handleNextPage} isDisabled={page === totalPages}>
          Siguiente
        </Button>
      </Flex>
    </Box>
  );
};

export default GameGrid;*/

//----------------------------------------------------------------------------------------

import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"; // Importa los íconos
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import { useEffect, useState } from "react";
import { addToFavorites, getFavorites, removeFromFavorites } from "../firestore";
import { Game } from "../hooks/useGames";

interface Props {
  gameQuery: GameQuery;
  onFavoriteChange: (message: string, status: "success" | "error") => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const GameGrid = ({ gameQuery, onFavoriteChange, page, setPage }: Props) => {
  const { data, error, isLoading, totalPages } = useGames(gameQuery, page);
  const skeletonCount = isLoading ? Array(20).fill(null) : [];
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteGames(favorites);
    };

    fetchFavorites();
  }, [onFavoriteChange]);

  const toggleFavorite = async (game: Game) => {
    if (favoriteGames.some((favGame) => favGame.id === game.id)) {
      await removeFromFavorites(game);
      setFavoriteGames(favoriteGames.filter((favGame) => favGame.id !== game.id));
      onFavoriteChange(`${game.name} removed from favorites!`, "error");
    } else {
      await addToFavorites(game);
      setFavoriteGames([...favoriteGames, game]);
      onFavoriteChange(`${game.name} added to favorites!`, "success");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (error) return <Text>{error}</Text>;

  return (
    <Box>
      <Flex justifyContent="center" padding="10px" alignItems="center" gap="4px">
        <Button
          onClick={handlePreviousPage}
          isDisabled={page === 1}
          size="sm"
          borderRadius="full"
          padding="8px"
        >
          <ArrowBackIcon />
        </Button>
        <Text>
          {page} / {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={page === totalPages}
          size="sm"
          borderRadius="full"
          padding="8px"
        >
          <ArrowForwardIcon />
        </Button>
      </Flex>

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

      <Flex justifyContent="center" padding="10px" alignItems="center" gap="4px">
        <Button
          onClick={handlePreviousPage}
          isDisabled={page === 1}
          size="sm"
          borderRadius="full"
          padding="8px"
        >
          <ArrowBackIcon />
        </Button>
        <Text>
          {page} / {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={page === totalPages}
          size="sm"
          borderRadius="full"
          padding="8px"
        >
          <ArrowForwardIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default GameGrid;




