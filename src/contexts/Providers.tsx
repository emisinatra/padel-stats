import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "./AuthContext";
import { MatchProvider } from "./MatchContext";
import { theme } from "../theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MatchProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </MatchProvider>
    </AuthProvider>
  );
}
