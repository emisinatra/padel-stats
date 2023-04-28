export type Side = "L" | "R"
type Team = { players: Record<Side, Player>; score: Score }
type Player = { id: number; name: string }

type Score = {
  points: number
  sets: { 0: number; 1: number; 2: number }
  tieBreakPoints: number
}

export type Point = {
  scoredAt: number
  teamSide: Side
  playerSide: Side | null
  prevScore: { L: Score; R: Score; isTieBreak: boolean }
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

export type Match = {
  startedAt: number
  endedAt: number

  initialServer: Side
  currentServer: Side

  currentSet: 0 | 1 | 2
  isTieBreak: boolean

  setsWinners: { 0: Side; 1: Side; 2: Side }
  matchWinner: Side

  teams: Record<Side, Team>
  points: Point[]
}
