import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig";
import { Game } from "../hooks/useGames";

const auth = getAuth();

export const addToFavorites = async (game: Game) => {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is signed in.");
    return;
  }

  const userFavoritesRef = doc(db, "Favorites", user.uid);
  await updateDoc(userFavoritesRef, {
    games: arrayUnion(game),
  });

  const updatedFavorites = await getFavorites();
  console.log("Updated favorites after adding:", updatedFavorites);

  if (updatedFavorites.some((favGame: Game) => favGame.id === game.id)) {
    console.log(`Game ${game.name} added to favorites successfully!`);
  } else {
    console.log(`Failed to add game ${game.name} to favorites.`);
  }
};

export const removeFromFavorites = async (game: Game) => {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is signed in.");
    return;
  }

  const userFavoritesRef = doc(db, "Favorites", user.uid);
  await updateDoc(userFavoritesRef, {
    games: arrayRemove(game),
  });

  const updatedFavorites = await getFavorites();
  console.log("Updated favorites after removing:", updatedFavorites);

  if (!updatedFavorites.some((favGame: Game) => favGame.id === game.id)) {
    console.log(`Game ${game.name} removed from favorites successfully!`);
  } else {
    console.log(`Failed to remove game ${game.name} from favorites.`);
  }
};

export const getFavorites = async (): Promise<Game[]> => {
  if (!auth.currentUser) return [];

  const userFavoritesRef = doc(db, "Favorites", auth.currentUser.uid);
  const docSnap = await getDoc(userFavoritesRef);

  if (docSnap.exists()) {
    return docSnap.data().games || [];
  } else {
    await setDoc(userFavoritesRef, { games: [] });
    return [];
  }
};
