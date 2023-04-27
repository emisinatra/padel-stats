import { produce } from "immer"

import { initialState } from "./initialState"
import type { Match, Point, TeamSide } from "./types"

type Action =
  | { type: "START_MATCH" }
  | { type: "END_MATCH" }
  | { type: "RESET_MATCH" }
  | { type: "ADD_POINT"; payload: Point }

const checkMatchWinner = (setsWinners: Match["setsWinners"], winningTeamSide: TeamSide): boolean =>
  Object.entries(setsWinners).reduce((count, [, teamSide]) => {
    return teamSide === winningTeamSide ? count + 1 : count
  }, 0) === 2

export const reducer = produce((draft: Match, action: Action) => {
  switch (action.type) {
    case "START_MATCH":
      draft.startedAt = Date.now()
      break

    case "END_MATCH":
      if (draft.startedAt === null) return
      draft.endedAt = Date.now()
      break

    case "RESET_MATCH":
      return initialState

    case "ADD_POINT":
      if (draft.startedAt === null) return
      if (draft.endedAt !== null) return

      const { teamSide, type: hitType } = action.payload
      const winningTeamSide = hitType === "WINNER" ? teamSide : teamSide === "L" ? "R" : "L"
      const losingTeamSide = hitType === "WINNER" ? (teamSide === "L" ? "R" : "L") : teamSide
      const winningTeam = draft.teams[winningTeamSide]
      const losingTeam = draft.teams[losingTeamSide]
      draft.points.push(action.payload)

      if (draft.isTieBreak) {
        // TODO
      } else {
        if (winningTeam.score.points === 0) {
          winningTeam.score.points = 15
        } else if (winningTeam.score.points === 15) {
          winningTeam.score.points = 30
        } else if (winningTeam.score.points === 30) {
          winningTeam.score.points = 40
        } else if (winningTeam.score.points === 40) {
          winningTeam.score.points = 0
          losingTeam.score.points = 0
          winningTeam.score.sets[draft.currentSet] += 1

          if (winningTeam.score.sets[draft.currentSet] >= 6) {
            if (winningTeam.score.sets[draft.currentSet] - losingTeam.score.sets[draft.currentSet] >= 2) {
              draft.setsWinners[draft.currentSet] = winningTeamSide
              draft.currentSet += 1
            } else if (
              winningTeam.score.sets[draft.currentSet] === 6 &&
              losingTeam.score.sets[draft.currentSet] === 6
            ) {
              draft.isTieBreak = true
            }
          }
        }

        if (checkMatchWinner(draft.setsWinners, winningTeamSide)) {
          draft.matchWinner = winningTeamSide
          draft.endedAt = Date.now()
        }
      }

      break

    default:
      break
  }
})
