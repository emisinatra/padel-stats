import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../../components/ui/Button"

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 80vh;
  padding: 1rem;
`

const ButtonsWrapper = styled.div`
  border-color: ${({ theme }) => theme.colors.lime[600]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-style: solid;
  border-width: 2px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 5rem;
`

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  min-width: 200px;
  padding: 0.8rem 1.2rem;
`

export default function AppHome() {
  return (
    <PageWrapper>
      <ButtonsWrapper>
        <StyledButton as={Link} to="/app/matches/tracker">
          Match tracker
        </StyledButton>

        <StyledButton as={Link} to="/app/players/register">
          Register player
        </StyledButton>

        <StyledButton as={Link} to="/app/matches">
          Matches
        </StyledButton>

        <StyledButton as={Link} to="/app/players">
          Players
        </StyledButton>

        <StyledButton>Sign out</StyledButton>
      </ButtonsWrapper>
    </PageWrapper>
  )
}
