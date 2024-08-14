import { useEffect, useState } from "react";
import { Button, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../firestore";
import useGamesList from "../hooks/useGamesList";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "../App";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";

interface Props {
  gameQuery: GameQuery;
}

const FavoritesGrid = ({ gameQuery }: Props) => {
  const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
  console.log("Favorite Games IDs:", favoriteGames);
  const { data, error, isLoading } = useGamesList({ ids: favoriteGames });
  const skeletonCount = isLoading ? Array(20).fill(null) : [];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "favorites"), (snapshot) => {
      const favoritesIds = snapshot.docs.map((doc) => doc.id);
      setFavoriteGames(favoritesIds);
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, []);

  const toggleFavorite = async (gameId: string) => {
    try {
      const favoritesRef = doc(db, "Favorites", gameId);
      if (favoriteGames.includes(gameId)) {
        await deleteDoc(favoritesRef);
      } else {
        await updateDoc(favoritesRef, { gameId });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  console.log("isLoading:", isLoading);
  console.log("data:", data);

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
      {data.map((game) => {
        console.log("Game Data:", game); // Imprime los datos del juego en la consola
        return (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
            <Button
              position="absolute"
              top={2}
              right={2}
              onClick={() => toggleFavorite(game.id.toString())}
            >
              <Icon
                as={
                  favoriteGames.includes(game.id.toString())
                    ? FaHeart
                    : FaRegHeart
                }
                color="red.400"
              />
            </Button>
          </GameCardContainer>
        );
      })}
    </SimpleGrid>
  );
};

export default FavoritesGrid;
