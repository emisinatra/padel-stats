import styled from "styled-components"

const CardWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  width: 250px;
`

const PlayerImage = styled.img`
  background-color: #ccc;
  border-radius: 50%;
  height: 100px;
  margin-bottom: 1rem;
  width: 100px;
  object-fit: cover;
`

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PlayerName = styled.h3`
  margin: 0;
`

const PlayerDetail = styled.p`
  margin: 0;
`

interface PlayerCardProps {
  firstName: string
  lastName: string
  birthdate: string
  side: string
  country: string
  imagePath: string
}

const PlayerCard = ({ firstName, lastName, birthdate, side, country, imagePath }: PlayerCardProps) => {
  return (
    <CardWrapper>
      <PlayerImage src={imagePath} alt={`${firstName} ${lastName}`} />
      <PlayerInfo>
        <PlayerName>{`${firstName} ${lastName}`}</PlayerName>
        <PlayerDetail>Fecha de nacimiento: {birthdate}</PlayerDetail>
        <PlayerDetail>Lado: {side}</PlayerDetail>
        <PlayerDetail>País: {country}</PlayerDetail>
      </PlayerInfo>
    </CardWrapper>
  )
}

export { PlayerCard }
