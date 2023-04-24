import { Link } from "react-router-dom"

import { Button } from "../../components/ui/Button"

export default function AppHome() {
  return (
    <div>
      <div>
        <div>
          <Button as={Link} to="/app/matches/tracker">
            Match tracker
          </Button>

          <Button as={Link} to="/app/players/register">
            Register player
          </Button>
        </div>

        <Button as={Link} to="/app/matches">
          Matches
        </Button>

        <Button as={Link} to="/app/players">
          Players
        </Button>

        <Button>Sign out</Button>
      </div>
    </div>
  )
}
