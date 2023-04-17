import { useCallback, useEffect, useReducer, useState } from "react";
import constate from "constate";
import produce from "immer";

function formatTimer(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const matchReducer = (
  state: typeof initialState,
  action
): typeof initialState => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  set: 0,
  game: 0,
  tieBreak: false,
  server: null,
  teams: [
    {
      sets: [
        { points: 0, games: 0 },
        { points: 0, games: 0 },
        { points: 0, games: 0 },
      ],
      players: [
        { name: null, points: [] },
        { name: null, points: [] },
      ],
    },
    {
      sets: [
        { points: 0, games: 0 },
        { points: 0, games: 0 },
        { points: 0, games: 0 },
      ],
      players: [
        { name: null, points: [] },
        { name: null, points: [] },
      ],
    },
  ],
};

export const [MatchProvider, useMatch] = constate(() => {
  const [state, dispatch] = useReducer(matchReducer, initialState);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [status, setStatus] = useState("STOPPED");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (status === "PLAYING") {
      const id = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      setIntervalId(id);
    }

    return () => clearInterval(intervalId);
  }, [status, elapsedTime]);

  const start = useCallback(() => {
    setStatus("PLAYING");
  }, []);

  const pause = useCallback(() => {
    setStatus("PAUSED");
  }, []);

  const stop = useCallback(() => {
    setStatus("STOPPED");
  }, []);

  return { elapsedTime, status, state, dispatch, start, pause };
});
