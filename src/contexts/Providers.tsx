import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "styled-components"

import { AuthProvider } from "./AuthContext"
import { MatchProvider } from "./Match"
import { theme } from "../theme"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MatchProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </MatchProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
