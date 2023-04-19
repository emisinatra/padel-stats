import { BiPause, BiPlay, BiStop } from "react-icons/bi";
import styled from "styled-components";
import { useMatch } from "../../contexts/MatchContext";

const Grid = styled.div<{ columns?: number; gap?: number; padding?: number }>`
  display: grid;
  gap: 0.8rem;
  grid-template-columns: ${({ columns = 1 }) => `repeat(${columns}, 1fr)`};
  padding: ${({ padding = 0 }) => `${padding}rem`};
`;

const BoardButton = styled("button")<
  | {
      error?: undefined;
      winner: true;
    }
  | {
      error: true;
      winner?: undefined;
    }
>`
  appearance: none;

  background-color: ${({ error, theme, winner }) => {
    if (winner) return theme.colors.lime[300];
    else if (error) return theme.colors.red[300];
  }};

  border-color: ${({ error, theme, winner }) => {
    if (winner) return theme.colors.lime[700];
    else if (error) return theme.colors.red[700];
  }};

  border-radius: 0.4rem;
  border-style: solid;

  color: ${({ error, theme, winner }) => {
    if (winner) return theme.colors.lime[1200];
    else if (error) return theme.colors.red[1200];
  }};

  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.4rem;
  transition-property: all;
  transition-duration: 100ms;

  &:hover {
    background-color: ${({ error, theme, winner }) => {
      if (winner) return theme.colors.lime[400];
      else if (error) return theme.colors.red[400];
    }};

    border-color: ${({ error, theme, winner }) => {
      if (winner) return theme.colors.lime[800];
      else if (error) return theme.colors.red[800];
    }};
  }

  &:active {
    background-color: ${({ error, theme, winner }) => {
      if (winner) return theme.colors.lime[500];
      else if (error) return theme.colors.red[500];
    }};
  }
`;

function Board(): JSX.Element {
  return (
    <Grid columns={2}>
      <Grid columns={2}>
        <BoardButton winner>Ace</BoardButton>
        <BoardButton winner>Bandeja</BoardButton>
        <BoardButton winner>Drive</BoardButton>
        <BoardButton winner>Reves</BoardButton>
        <BoardButton winner>Víbora</BoardButton>

        <Grid columns={2}>
          <BoardButton winner>Salida Pared Drive</BoardButton>
          <BoardButton winner>Salida Pared Revés</BoardButton>
        </Grid>

        <Grid columns={2}>
          <BoardButton winner>Volea Drive</BoardButton>
          <BoardButton winner>Volea Reves</BoardButton>
        </Grid>

        <Grid columns={3}>
          <BoardButton winner>Smash Plano</BoardButton>
          <BoardButton winner>Smash X3</BoardButton>
          <BoardButton winner>Smash X4</BoardButton>
        </Grid>
      </Grid>

      <Grid columns={2}>
        <Grid columns={2}>
          <BoardButton error>Bandeja</BoardButton>
          <BoardButton error>Doble Falta</BoardButton>
        </Grid>

        <Grid columns={3}>
          <BoardButton error>Drive</BoardButton>
          <BoardButton error>Revés</BoardButton>
          <BoardButton error>Víbora</BoardButton>
        </Grid>

        <Grid columns={2}>
          <BoardButton error>Globo Drive</BoardButton>
          <BoardButton error>Globo revés</BoardButton>
        </Grid>

        <Grid columns={2}>
          <BoardButton error>Salida Pared Drive</BoardButton>
          <BoardButton error>Salida Pared Revés</BoardButton>
        </Grid>

        <Grid columns={2}>
          <BoardButton error>Volea Drive</BoardButton>
          <BoardButton error>Volea revés</BoardButton>
        </Grid>

        <Grid columns={3}>
          <BoardButton error>Smash Plano</BoardButton>
          <BoardButton error>Smash X3</BoardButton>
          <BoardButton error>Smash X4</BoardButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function Timer(): JSX.Element {
  const { time, status, play, pause, stop } = useMatch();

  return (
    <Grid columns={1}>
      <div>{formatTime(time)}</div>
      <div>{status}</div>

      <Grid columns={3}>
        <TimerControl onClick={play}>
          <BiPlay size={48} />
        </TimerControl>

        <TimerControl onClick={pause}>
          <BiPause size={48} />
        </TimerControl>

        <TimerControl onClick={stop}>
          <BiStop size={48} />
        </TimerControl>
      </Grid>
    </Grid>
  );
}

const TimerControl = styled.button``;

export default function () {
  return (
    <Grid columns={1}>
      <Timer />
      <Board />
    </Grid>
  );
}
