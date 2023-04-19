import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import Match from "./routes/app/matches/match";
import Matches from "./routes/app/matches";
import Player from "./routes/app/players/player";
import Players from "./routes/app/players";
import Register from "./routes/app/players/register";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import Tracker from "./routes/app/matches/create";
import Home from "./routes";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />

      <Route path="app" element={<AppLayout />}>
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
