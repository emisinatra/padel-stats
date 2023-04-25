import { useEffect, useState } from "react"
import styled from "styled-components"
import { PlayerCard } from "../../../components/players/playerCard"
import { getPlayersByCoachId } from "../../../controllers/players/getPlayersByCoachId"
import { useAuth } from "../../../contexts/AuthContext"

const PlayersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`

const PlayersView = () => {
  const [players, setPlayers] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const coachId = user.id
        const data = await getPlayersByCoachId(coachId)
        setPlayers(data)
      } catch (error) {
        console.error("Error al obtener los jugadores:", error)
      }
    }

    fetchPlayers()
  }, [])

  return (
    <PlayersGrid>
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          firstName={player.name}
          lastName={player.lastName}
          birthdate={player.dateOfBirth}
          side={player.side}
          country={player.country}
        />
      ))}
    </PlayersGrid>
  )
}

export default PlayersView
