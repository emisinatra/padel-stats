type SetKey = 1 | 2 | 3
export type TeamSide = "L" | "R"
type PlayerSide = "L" | "R"

export type Point = {
  teamSide: TeamSide
  playerSide: PlayerSide | null

  scoredAt: number

  prevScore: {
    L: Score
    R: Score
    isTieBreak: boolean
  }
} & (
  | {
      type: "WINNER"
      hit:
        | "WINNER_ACE"
        | "WINNER_SAQUE_GANADOR"
        | "WINNER_VOLEA_DRIVE"
        | "WINNER_VOLEA_REVES"
        | "WINNER_SMASH_POTENCIA"
        | "WINNER_SMASH_X3"
        | "WINNER_PARED_DRIVE"
        | "WINNER_PARED_REVES"
        | "WINNER_BANDEJA"
        | "WINNER_DRIVE"
        | "WINNER_REVES"
        | null
    }
  | {
      type: "ERROR"
      hit:
        | "ERROR_DOBLE_FALTA"
        | "ERROR_VOLEA_DRIVE"
        | "ERROR_VOLEA_REVES"
        | "ERROR_SMASH"
        | "ERROR_PARED_DRIVE"
        | "ERROR_PARED_REVES"
        | "ERROR_BANDEJA"
        | "ERROR_DRIVE"
        | "ERROR_REVES"
        | "ERROR_GLOBO"
        | null
    }
)

type Score = {
  points: number
  sets: Record<SetKey, number>
  tieBreakPoints: number
}

export type Match = {
  startedAt: number
  endedAt: number
  initialServer: TeamSide
  currentServer: TeamSide
  currentSet: 1 | 2 | 3

  setsWinners: {
    1: "L" | "R"
    2: "L" | "R"
    3: "L" | "R"
  }

  isTieBreak: boolean
  matchWinner: "L" | "R"
  teams: { L: Team; R: Team }
  points: Point[]
}

type Team = {
  players: Record<PlayerSide, Player>
  score: Score
}

type Player = {
  id: number
  name: string
}
