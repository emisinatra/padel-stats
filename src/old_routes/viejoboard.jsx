import { useState, useEffect } from "react";
import styled from "styled-components";

import OptionsModal from "../components/OptionsModal.jsx";
import GameHeader from "../components/GameHeader.jsx";
import Footer from "../components/Footer.js";

const golpesWinners = [
  "Forehand",
  "Backhand",
  "Forehand Volley",
  "Backhand Volley",
  "Bandeja",
  "Víbora",
  "OOW",
  "Smash",
  "x3",
  "x4",
];

const golpesErrores = [
  "Forehand",
  "Backhand",
  "Forehand Volley",
  "Backhand Volley",
  "Bandeja",
  "Víbora",
  "OOW",
  "Smash",
  "Lob",
  "x4",
];

const golpesOOW = ["Forehand OOW", "Backhand OOW"];
const golpesSmash = ["Flat", "x3"];
const golpesLob = ["Backhand Lob", "Forehand Lob"];

const initialState = {
  winners: {},
  errores: {},
  modalData: {
    isOpen: false,
    golpe: null,
    tipo: null,
    opciones: null,
  },
  selectedOption: null,
};

golpesWinners.forEach((golpe) => {
  initialState.winners[golpe] = 0;
  initialState.errores[golpe] = 0;
});
golpesErrores.forEach((golpe) => {
  initialState.winners[golpe] = 0;
  initialState.errores[golpe] = 0;
});

golpesOOW.forEach((golpe) => {
  initialState.winners[golpe] = 0;
  initialState.errores[golpe] = 0;
});
golpesSmash.forEach((golpe) => {
  initialState.winners[golpe] = 0;
  initialState.errores[golpe] = 0;
});

golpesLob.forEach((golpe) => {
  initialState.winners[golpe] = 0;
  initialState.errores[golpe] = 0;
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(90deg, #f3f3f3 0%, #ededed 100%);
  flex-grow: 1;
`;

const BoardContainer = styled.div`
  display: flex;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  gap: 0.5rem;
  max-width: 100%;
  max-height: 100vh;
  overflow: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0.25rem;
  width: 100%;
`;

const Square = styled.div`
  margin: 0.25rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  aspect-ratio: 1 / 1.5;

  /* TODO recibir prop para color condicional */
  background-color: ${() => (true ? "#4caf50" : "#f44336")};

  @media (max-width: 600px) {
    font-size: 0.7rem;
    padding: 0.4rem;
  }

  @media (min-width: 601px) {
    font-size: 0.8rem;
    padding: 0.6rem;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #212529;
  color: #212529;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

function Board() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [stats, setStats] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (tipo, golpe) => {
    if (golpe === "OOW" || golpe === "Smash" || golpe === "Lob") {
      const opciones =
        golpe === "OOW"
          ? golpesOOW
          : golpe === "Smash"
          ? golpesSmash
          : golpe === "Lob"
          ? golpesLob
          : null;

      setShowModal(true);
      setStats((prevStats) => ({
        ...prevStats,
        modalData: {
          isOpen: true,
          golpe,
          tipo,
          opciones,
        },
      }));
    } else {
      setStats((prevStats) => {
        const newStats = { ...prevStats };
        newStats[tipo][golpe]++;
        return newStats;
      });
      setTotalPoints((prevTotal) => prevTotal + 1);
      setElapsedTime((prevTime) => prevTime + 1);
    }
  };

  const resetStats = () => {
    setStats(initialState);
    setTotalPoints(0);
    setElapsedTime(0);
  };

  const porcentaje = (tipo, golpe) => {
    const totalTipo = Object.values(stats[tipo]).reduce((a, b) => a + b, 0);
    if (totalTipo === 0) return "0%";
    const porcentaje = (stats[tipo][golpe] / totalTipo) * 100;
    return `${Math.round(porcentaje)}%`;
  };

  useEffect(() => {
    if (!matchInProgress) {
      resetStats();
    }
  }, [matchInProgress]);

  const handleModalClose = () => {
    setStats((prevStats) => ({
      ...prevStats,
      modalData: {
        isOpen: false,
        golpe: null,
        tipo: null,
        opciones: null,
      },
    }));
    setShowModal(false);
  };
  return (
    <Main>
      <GameHeader
        title="Tablero"
        matchInProgress={matchInProgress}
        setMatchInProgress={setMatchInProgress}
        totalPoints={69}
      />

      <Container>
        <BoardContainer>
          <Section>
            <h1>WINNERS</h1>
            <Grid>
              {golpesWinners.map((golpe) => (
                <Square
                  key={golpe}
                  /* TODO agregar prop color condicional */
                  onClick={() => handleClick("winners", golpe)}
                >
                  {golpe} <br />
                  {stats.winners[golpe]} <br />
                  {porcentaje("winners", golpe)}
                </Square>
              ))}
            </Grid>
          </Section>
          <Section>
            <h1>ERRORES</h1>
            <Grid>
              {golpesErrores.map((golpe) => (
                <Square
                  key={golpe}
                  /* TODO agregar prop color condicional */
                  onClick={() => handleClick("errores", golpe)}
                >
                  {golpe} <br />
                  {stats.errores[golpe]} <br />
                  {porcentaje("errores", golpe)}
                </Square>
              ))}
            </Grid>
          </Section>
        </BoardContainer>
      </Container>

      <TitleWrapper>
        <Button onClick={resetStats}>Reset</Button>
      </TitleWrapper>

      {showModal && (
        <OptionsModal
          tipo={stats.modalData.tipo}
          golpe={stats.modalData.golpe}
          opciones={stats.modalData.opciones}
          handleCloseModal={handleModalClose}
          stats={stats}
          setStats={setStats}
          setSelectedOption={setSelectedOption}
        />
      )}

      <Footer />
    </Main>
  );
}
