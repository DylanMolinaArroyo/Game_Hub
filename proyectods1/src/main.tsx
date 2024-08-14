import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
import "./index.css";
import theme from "./theme.ts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import AuthRoute from "./AuthRoute.tsx";
import { firebaseConfig } from "./services/firebaseConfig.ts";

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.InitialColorMode} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <App />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
