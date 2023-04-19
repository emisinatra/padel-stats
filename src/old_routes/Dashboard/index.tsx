import { useState, useEffect } from "react";
import TennisBall from "../../components/TennisBall";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";
import GameOptions from "./GameOptions";

import { Container, CentralContainer, TennisBallWrapper } from "./styles";

function Dashboard() {
  const [showGameOptions, setShowGameOptions] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const toggle = () => setShowGameOptions((prev) => !prev);

  useEffect(() => {
    if (showWelcomeMessage) {
      toast.success("Welcome!");
    }
  }, [showWelcomeMessage]);

  return (
    <>
      <Header title="Menú" />

      <Container>
        <CentralContainer>
          <TennisBallWrapper>
            <TennisBall />
          </TennisBallWrapper>
          {showGameOptions ? (
            <GameOptions toggle={toggle} />
          ) : (
            <Menu toggle={toggle} showWelcomeMessage={showWelcomeMessage} />
          )}
        </CentralContainer>
        <Footer />
      </Container>
    </>
  );
}

export default Dashboard;
