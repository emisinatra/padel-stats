import { useReducer } from "react"
import constate from "constate"

import { initialState } from "./initialState"
import { reducer } from "./reducer"

export const [MatchProvider, useMatch] = constate(() => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
})
