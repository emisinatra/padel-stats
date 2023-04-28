import { useState } from "react"

import { useMatch } from "../../../contexts/Match"
import type { Side } from "../../../contexts/Match/types"

export default function Tracker() {
  const [, setTracking] = useState<{ team: Side; player: Side }>({ team: "L", player: "L" })
  const { match, start, end, reset, addPointTeamL, addPointTeamR } = useMatch()

  return (
    <div>
      <button onClick={start}>START MATCH</button>
      <button onClick={end}>END MATCH</button>
      <button onClick={reset}>RESET MATCH</button>

      <button onClick={addPointTeamL}>ADD POINT TEAM L</button>
      <button onClick={addPointTeamR}>ADD POINT TEAM R</button>

      <button onClick={() => setTracking({ team: "L", player: "L" })}>TRACK PLAYER L OF TEAM L</button>
      <button onClick={() => setTracking({ team: "L", player: "R" })}>TRACK PLAYER R OF TEAM L</button>
      <button onClick={() => setTracking({ team: "R", player: "L" })}>TRACK PLAYER L OF TEAM R</button>
      <button onClick={() => setTracking({ team: "R", player: "R" })}>TRACK PLAYER R OF TEAM R</button>

      <div>IS TIE BREAK? {match.isTieBreak ? "TRUE" : "FALSE"}</div>
      <div>SET 1 WINNER {match.setsWinners[0] ?? "NO WINNER YET"}</div>
      <div>SET 2 WINNER {match.setsWinners[1] ?? "NO WINNER YET"}</div>
      <div>SET 3 WINNER {match.setsWinners[2] ?? "NO WINNER YET"}</div>
      <div>MATCH WINNER {match.matchWinner ?? "NO WINNER YET"}</div>
      <div>{match.startedAt ? `STARTED AT ${new Date(match.startedAt).toString()}` : "NOT STARTED YET"}</div>
      <div>{match.endedAt ? `ENDED AT ${new Date(match.endedAt).toString()}` : "NOT ENDED YET"}</div>

      <div>TEAM L</div>
      <div>PLAYER L NAME {match.teams["L"].players["L"].name}</div>
      <div>PLAYER R NAME {match.teams["L"].players["R"].name}</div>
      <div>POINTS {match.teams["L"].score.points}</div>
      <div>TIE BREAK POINTS {match.teams["L"].score.tieBreakPoints}</div>
      <div>SET 1 GAMES {match.teams["L"].score.sets[0]}</div>
      <div>SET 2 GAMES {match.teams["L"].score.sets[1]}</div>
      <div>SET 3 GAMES {match.teams["L"].score.sets[2]}</div>

      <div>TEAM R</div>
      <div>PLAYER L NAME {match.teams["R"].players["L"].name}</div>
      <div>PLAYER R NAME {match.teams["R"].players["R"].name}</div>
      <div>POINTS {match.teams["R"].score.points}</div>
      <div>TIE BREAK POINTS {match.teams["R"].score.tieBreakPoints}</div>
      <div>SET 1 GAMES {match.teams["R"].score.sets[0]}</div>
      <div>SET 2 GAMES {match.teams["R"].score.sets[1]}</div>
      <div>SET 3 GAMES {match.teams["R"].score.sets[2]}</div>

      {match.points.map((point) => (
        <pre key={point.scoredAt}>{JSON.stringify(point)}</pre>
      ))}
    </div>
  )
}
