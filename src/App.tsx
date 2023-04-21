import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import AppRoot from "./routes/app";
import Home from "./routes";
import Match from "./routes/app/matches/match";
import Matches from "./routes/app/matches";
import Player from "./routes/app/players/player";
import Players from "./routes/app/players";
import Register from "./routes/app/players/register";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Tracker from "./routes/app/matches/tracker";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import { Center } from "./components";
import { BeatLoader } from "react-spinners";

const MyComponent = () => {
  const { status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "AUTHENTICATED") navigate("/app");
  }, [status, navigate]);

  if (status === "LOADING") {
    return (
      <Center style={{ height: "100vh" }}>
        <BeatLoader />
      </Center>
    );
  }

  return <Outlet />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<MyComponent />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<AppRoot />} />

        <Route path="matches">
          <Route index element={<Matches />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path=":matchId" element={<Match />} />
        </Route>

        <Route path="players">
          <Route index element={<Players />} />
          <Route path="register" element={<Register />} />
          <Route path=":playerId" element={<Player />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
