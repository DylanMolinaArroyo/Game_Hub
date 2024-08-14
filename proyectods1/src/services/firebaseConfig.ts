import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCc5EtpwBZRqHmv7g7R41plJGcrU18kf04",
  authDomain: "proyectods1.firebaseapp.com",
  projectId: "proyectods1",
  storageBucket: "proyectods1.appspot.com",
  messagingSenderId: "782687820056",
  appId: "1:782687820056:web:dba1bd8ddf741eaa47666d",
  measurementId: "G-RGKJHTY2WN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
