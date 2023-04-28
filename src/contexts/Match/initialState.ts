import type { Match } from "./types"

export const initialState: Match = {
  startedAt: null,
  endedAt: null,
  initialServer: "L",
  currentServer: "L",
  currentSet: 0,
  setsWinners: { 0: null, 1: null, 2: null },
  isTieBreak: false,
  matchWinner: null,

  teams: {
    L: {
      players: {
        L: { id: null, name: "Player 1" },
        R: { id: null, name: "Player 2" },
      },
      score: {
        points: 0,
        sets: { 0: 0, 1: 0, 2: 0 },
        tieBreakPoints: 0,
      },
    },
    R: {
      players: {
        L: { id: null, name: "Player 3" },
        R: { id: null, name: "Player 4" },
      },
      score: {
        points: 0,
        sets: { 0: 0, 1: 0, 2: 0 },
        tieBreakPoints: 0,
      },
    },
  },

  points: [],
}
