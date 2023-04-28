import { produce } from "immer"

import { initialState } from "./initialState"
import type { Match, Point } from "./types"

type Action =
  | { type: "START_MATCH" }
  | { type: "END_MATCH" }
  | { type: "RESET_MATCH" }
  | { type: "ADD_POINT"; payload: Point }

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

      let { currentSet, isTieBreak, setsWinners, teams } = draft
      let { teamSide, type: hitType } = action.payload
      let w = hitType === "WINNER" ? teamSide : teamSide === "L" ? "R" : "L"
      let l = hitType === "WINNER" ? (teamSide === "L" ? "R" : "L") : teamSide
      draft.points.push(action.payload)

      if (draft.isTieBreak) {
        teams[w].score.tieBreakPoints += 1
      } else {
        if (teams[w].score.points === 0) teams[w].score.points = 15
        else if (teams[w].score.points === 15) teams[w].score.points = 30
        else if (teams[w].score.points === 30) teams[w].score.points = 40
        else if (teams[w].score.points === 40) {
          teams[w].score.points = 0
          teams[l].score.points = 0
          teams[w].score.sets[currentSet] += 1

          if (teams[w].score.sets[currentSet] >= 6) {
            if (teams[w].score.sets[currentSet] - teams[l].score.sets[currentSet] >= 2) {
              setsWinners[currentSet] = w
              currentSet += 1
            } else if (teams[w].score.sets[currentSet] === 6 && teams[l].score.sets[currentSet] === 6) isTieBreak = true
          }
        }

        let winningTeamWonTheMatch =
          Object.entries(setsWinners).reduce((count, [, teamSide]) => (teamSide === w ? count + 1 : count), 0) === 2

        if (winningTeamWonTheMatch) {
          draft.matchWinner = w
          draft.endedAt = Date.now()
        }
      }

      break

    default:
      break
  }
})
