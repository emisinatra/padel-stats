import { FaPlay, FaStop } from "react-icons/fa"
import { useState } from "react"
import styled from "styled-components"

import { Button } from "../../../components/ui/Button"
import { Flex } from "../../../components/common/Flex"
import { useMatch } from "../../../contexts/Match/context"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ScoreBoard = styled.div``

const Team = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const PlayersContainer = styled.div`
  display: flex;
  font-weight: bold;
  gap: 0.4rem;
`

const Player = styled.span``

const Points = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: bold;
`

const SetsContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`

const Sets = styled.span``

export default function Tracker() {
  const [tracking, setTracking] = useState({
    team: "L",
    player: "L",
  })

  const { state, dispatch } = useMatch()

  return (
    <Container>
      <Flex>
        <Button onClick={() => dispatch({ type: "START_MATCH" })}>
          <FaPlay />
        </Button>

        <Button onClick={() => dispatch({ type: "END_MATCH" })}>
          <FaStop />
        </Button>

        <Button onClick={() => dispatch({ type: "RESET_MATCH" })}>RESET</Button>
      </Flex>

      <Flex>
        <Button
          onClick={() =>
            dispatch({
              type: "ADD_POINT",
              payload: {
                playerSide: null,
                hit: null,
                type: "WINNER",

                teamSide: "L",
                scoredAt: Date.now(),
                prevScore: {
                  L: state.teams.L.score,
                  R: state.teams.R.score,
                  isTieBreak: state.isTieBreak,
                },
              },
            })
          }
        >
          ADD POINT TEAM L
        </Button>

        <Button
          onClick={() =>
            dispatch({
              type: "ADD_POINT",
              payload: {
                playerSide: null,
                hit: null,
                type: "WINNER",

                teamSide: "R",
                scoredAt: Date.now(),
                prevScore: {
                  L: state.teams.L.score,
                  R: state.teams.R.score,
                  isTieBreak: state.isTieBreak,
                },
              },
            })
          }
        >
          ADD POINT TEAM R
        </Button>
      </Flex>

      <Flex>
        <Button onClick={() => setTracking({ team: "L", player: "L" })}>Track Player L of Team L</Button>
        <Button onClick={() => setTracking({ team: "L", player: "R" })}>Track Player R of Team L</Button>
        <Button onClick={() => setTracking({ team: "R", player: "L" })}>Track Player L of Team R</Button>
        <Button onClick={() => setTracking({ team: "R", player: "R" })}>Track Player R of Team R</Button>
      </Flex>

      <p>
        Tracking player {tracking.player} of team {tracking.team}
      </p>

      <p>Set 0 winner: {state.setsWinners[1] ?? "No winner yet"}</p>
      <p>Set 1 winner: {state.setsWinners[2] ?? "No winner yet"}</p>
      <p>Set 2 winner: {state.setsWinners[3] ?? "No winner yet"}</p>

      <p>Match winner: {state.matchWinner ?? "No winner yet"}</p>

      <p>{state.startedAt ? `startedAt: ${new Date(state.startedAt).toString()}` : "Todavía no empieza"}</p>
      <p>{state.endedAt ? `endedAt: ${new Date(state.endedAt).toString()}` : "Todavía no termina"}</p>
      <p>isTieBreak: {state.isTieBreak ? "true" : "false"}</p>

      <ScoreBoard>
        <Team>
          <PlayersContainer>
            <Player>{state.teams["L"].players["L"].name}</Player>
            <Player>{state.teams["L"].players["R"].name}</Player>
          </PlayersContainer>

          <Points>{state.teams["L"].score.points}</Points>
          {state.isTieBreak && <Points>{state.teams["L"].score.tieBreakPoints}</Points>}

          <SetsContainer>
            <Sets>{state.teams["L"].score.sets[1]}</Sets>
            <Sets>{state.teams["L"].score.sets[2]}</Sets>
            <Sets>{state.teams["L"].score.sets[3]}</Sets>
          </SetsContainer>
        </Team>

        <Team>
          <PlayersContainer>
            <Player>{state.teams["R"].players["L"].name}</Player>
            <Player>{state.teams["R"].players["R"].name}</Player>
          </PlayersContainer>

          <Points>{state.teams["R"].score.points}</Points>
          {state.isTieBreak && <Points>{state.teams["R"].score.tieBreakPoints}</Points>}

          <SetsContainer>
            <Sets>{state.teams["R"].score.sets[1]}</Sets>
            <Sets>{state.teams["R"].score.sets[2]}</Sets>
            <Sets>{state.teams["R"].score.sets[3]}</Sets>
          </SetsContainer>
        </Team>
      </ScoreBoard>

      {state.points.map((point) => (
        <pre key={point.scoredAt}>{JSON.stringify(point)}</pre>
      ))}
    </Container>
  )
}
