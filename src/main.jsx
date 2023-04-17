import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { MatchProvider } from "./contexts/MatchContext";

const theme = {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MatchProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </ThemeProvider>
      </MatchProvider>
    </AuthProvider>
  </React.StrictMode>
);
