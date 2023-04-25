import { MdAdd } from "react-icons/md"
import styled from "styled-components"

const TrackerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Score = styled.div``

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

const AddButton = styled.button.attrs({
  children: <MdAdd />,
})`
  align-items: center;
  border-radius: 100%;
  border: 1px solid black;
  display: flex;
  height: 1.6rem;
  justify-content: center;
  width: 1.6rem;
`

type Hit = string

type Point = {
  hit: Hit
  prevScore: Score
}

type Player = {
  id: number
  name: string
  points: Point[]
}

type Score = {
  points: 0
  sets: 0
  games: 0
}

type Team = {
  players: [Player, Player]
  score: Score
}

type Match = {
  startedAt: Date
  teams: [Team, Team]
}

export default function Tracker() {
  return (
    <TrackerContainer>
      <Score>
        <Team>
          <PlayersContainer>
            <Player>PLAYER1</Player>
            <Player>PLAYER2</Player>
          </PlayersContainer>

          <Points>0</Points>

          <SetsContainer>
            <Sets>0</Sets>
            <Sets>0</Sets>
            <Sets>0</Sets>
          </SetsContainer>

          <AddButton />
        </Team>

        <Team>
          <PlayersContainer>
            <Player>PLAYER3</Player>
            <Player>PLAYER4</Player>
          </PlayersContainer>

          <Points>0</Points>

          <SetsContainer>
            <Sets>0</Sets>
            <Sets>0</Sets>
            <Sets>0</Sets>
          </SetsContainer>

          <AddButton />
        </Team>
      </Score>
    </TrackerContainer>
  )
}
