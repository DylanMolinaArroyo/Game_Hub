import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";
import theme from "./theme.ts";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCc5EtpwBZRqHmv7g7R41plJGcrU18kf04",
  authDomain: "proyectods1.firebaseapp.com",
  projectId: "proyectods1",
  storageBucket: "proyectods1.appspot.com",
  messagingSenderId: "782687820056",
  appId: "1:782687820056:web:dba1bd8ddf741eaa47666d",
  measurementId: "G-RGKJHTY2WN"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.InitialColorMode} />
      <Router>
        <Routes>
          <Route path = "/" element = {<App />} />
          <Route path = "/" element = {<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
