import { Link } from "react-router-dom";
import styled from "styled-components";

import logoSrc from "../assets/padle-stats.png";
import { Container } from "../components/Container";
import { Button } from "../components";

const Title = styled.h2`
  font-size: 1.6rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ButtonLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.lime[300]};
  border-color: ${({ theme }) => theme.colors.lime[700]};
  border-radius: 0.4rem;
  border-style: solid;
  border-width: 1px;
  color: ${({ theme }) => theme.colors.lime[1200]};
  padding: 0.4rem 1.2rem;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lime[400]};
    border-color: ${({ theme }) => theme.colors.lime[800]};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.lime[500]};
  }
`;

export default function Home() {
  return (
    <Container>
      <img src={logoSrc} />

      <Title>Join the revolutionary world of padle stats!</Title>

      <ButtonGroup>
        <Button as={Link} to="/sign-in">
          Sign in
        </Button>

        <Button as={Link} to="/sign-up">
          Sign up
        </Button>
      </ButtonGroup>
    </Container>
  );
}
