import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./services/firebaseConfig";

const auth = getAuth();

export const addToFavorites = async (gameId: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is signed in.");
    return;
  }

  const userFavoritesRef = doc(db, "Favorites", user.uid);
  await updateDoc(userFavoritesRef, {
    games: arrayUnion(gameId),
  });

  const updatedFavorites = await getFavorites();
  console.log("Updated favorites after adding:", updatedFavorites);

  if (updatedFavorites.includes(gameId)) {
    console.log(`Game ${gameId} added to favorites successfully!`);
  } else {
    console.log(`Failed to add game ${gameId} to favorites.`);
  }
};

export const removeFromFavorites = async (gameId: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is signed in.");
    return;
  }

  const userFavoritesRef = doc(db, "Favorites", user.uid);
  await updateDoc(userFavoritesRef, {
    games: arrayRemove(gameId),
  });

  const updatedFavorites = await getFavorites();
  console.log("Updated favorites after removing:", updatedFavorites);

  if (!updatedFavorites.includes(gameId)) {
    console.log(`Game ${gameId} removed from favorites successfully!`);
  } else {
    console.log(`Failed to remove game ${gameId} from favorites.`);
  }
};

export const getFavorites = async () => {
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
