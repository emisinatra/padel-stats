import { Link } from "react-router-dom";

import { Button, Center, HStack, Title, VStack } from "../components";
import Logo from "../components/Logo";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedTitle = styled(Title)`
  animation-name: ${fadeIn};
  animation-duration: 1s;
`;

export default function Home() {
  return (
    <Center style={{ height: "100vh" }}>
      <VStack style={{ alignItems: "center" }}>
        <Logo />

        <AnimatedTitle style={{ fontSize: "1.6rem" }}>
          Join the revolutionary world of padle stats!
        </AnimatedTitle>

        <HStack>
          <Button as={Link} to="/sign-in">
            Sign in
          </Button>

          <Button as={Link} to="/sign-up">
            Sign up
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}
