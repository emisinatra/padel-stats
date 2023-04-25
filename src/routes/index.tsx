import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"

import { Button } from "../components/ui/Button"
import { Flex } from "../components/common/Flex"
import { Ball, Padle, Stats } from "../components/Logo"
import { useRef } from "react"

const Title = styled(motion.h2)`
  font-size: 1.6rem;
`

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 0.8rem;
`

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" gap={1.6} style={{ height: "100vh" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Padle />
        <Ball />
        <Stats />
      </div>

      <Title animate={{ y: [16, 0], opacity: [0, 1] }}>Join the revolutionary world of padle stats!</Title>

      <ButtonGroup animate={{ y: [-16, 0], opacity: [0, 1], rotateY: [45, 0] }}>
        <Button as={Link} to="/sign-in">
          Sign in
        </Button>

        <Button as={Link} to="/sign-up">
          Sign up
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
