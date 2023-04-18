import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import RegisterPlayer from "./routes/RegisterPlayer";
import Board from "./routes/Board";
// import CoachProfile from "./routes/CoachProfile";

export default function App() {
  const { status: authStatus } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          authStatus === "LOADING" ? (
            <div>Cargando...</div>
          ) : authStatus === "AUTHENTICATED" ? (
            <Dashboard />
          ) : (
            authStatus === "NOT_AUTHENTICATED" && <Login />
          )
        }
      />

      <Route path="/board" element={<Board />} />
      <Route path="/nuevo-jugador" element={<RegisterPlayer />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
