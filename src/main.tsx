import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./contexts/AuthContext";
import { MatchProvider } from "./contexts/MatchContext";
import { theme } from "./theme";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
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
