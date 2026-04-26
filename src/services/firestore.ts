import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig";
import { Game } from "../hooks/useGames";

const auth = getAuth();

export const addToFavorites = async (game: Game) => {
  const user = auth.currentUser;
  if (!user) return;

  const userFavoritesRef = doc(db, "Favorites", user.uid);
  await setDoc(userFavoritesRef, { games: arrayUnion(game) }, { merge: true });
};

export const removeFromFavorites = async (game: Game) => {
  const user = auth.currentUser;
  if (!user) return;

  const userFavoritesRef = doc(db, "Favorites", user.uid);
  await setDoc(userFavoritesRef, { games: arrayRemove(game) }, { merge: true });
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
