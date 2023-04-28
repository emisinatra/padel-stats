import { useReducer } from "react"
import constate from "constate"

import { initialState } from "./initialState"
import { reducer } from "./reducer"

export const [MatchProvider, useMatch] = constate(() => {
  const [match, matchDispatch] = useReducer(reducer, initialState)

  const start = () => matchDispatch({ type: "START_MATCH" })
  const end = () => matchDispatch({ type: "END_MATCH" })
  const reset = () => matchDispatch({ type: "RESET_MATCH" })

  const addPointTeamL = () =>
    matchDispatch({
      type: "ADD_POINT",
      payload: {
        teamSide: "L",
        playerSide: null,
        hit: null,
        type: "WINNER",

        scoredAt: Date.now(),
        prevScore: {
          L: match.teams.L.score,
          R: match.teams.R.score,
          isTieBreak: match.isTieBreak,
        },
      },
    })

  const addPointTeamR = () =>
    matchDispatch({
      type: "ADD_POINT",
      payload: {
        teamSide: "R",
        playerSide: null,
        hit: null,
        type: "WINNER",

        scoredAt: Date.now(),
        prevScore: {
          L: match.teams.L.score,
          R: match.teams.R.score,
          isTieBreak: match.isTieBreak,
        },
      },
    })

  return {
    match,
    matchDispatch,
    start,
    end,
    reset,
    addPointTeamL,
    addPointTeamR,
  }
})
