import { Link } from "react-router-dom";
import { Button, Center, HStack, VStack } from "../../components";

export default function AppRoot() {
  return (
    <Center style={{ height: "100%" }}>
      <VStack style={{ maxWidth: "390px" }}>
        <HStack>
          <Button as={Link} to="/app/matches/tracker">
            Match tracker
          </Button>

          <Button as={Link} to="/app/players/register">
            Register player
          </Button>
        </HStack>

        <Button as={Link} to="/app/matches">
          Matches
        </Button>

        <Button as={Link} to="/app/players">
          Players
        </Button>

        <Button>Sign out</Button>
      </VStack>
    </Center>
  );
}
