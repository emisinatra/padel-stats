import "react-toastify/dist/ReactToastify.css";
import "the-new-css-reset/css/reset.css";
import { createGlobalStyle } from "styled-components";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { Providers } from "./contexts/Providers";

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${({ theme }) => theme.colors.lime[100]};
    font-family: "Poppins", sans-serif;
  }
`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <GlobalStyle />
      <App />
      <ToastContainer />
    </Providers>
  </StrictMode>
);
