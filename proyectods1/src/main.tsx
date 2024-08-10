import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";
import Login from "./Login.tsx";
import Signup from './Signup.tsx'
import './index.css'
import theme from "./theme.ts";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import AuthRoute from './AuthRoute.tsx'

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
          <Route path="/" element={<AuthRoute><App /></AuthRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
