import { Link } from "react-router-dom"
import styled from "styled-components"

import { Button } from "../components/ui/Button"
import { Flex } from "../components/common/Flex"
import logoSrc from "../assets/padle-stats.png"

const Title = styled.h2`
  font-size: 1.6rem;
`

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" gap={1.6} style={{ height: "100vh" }}>
      <img src={logoSrc} />

      <Title>Join the revolutionary world of padle stats!</Title>

      <Flex gap={0.8}>
        <Button as={Link} to="/sign-in">
          Sign in
        </Button>

        <Button as={Link} to="/sign-up">
          Sign up
        </Button>
      </Flex>
    </Flex>
  )
}
