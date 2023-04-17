import { useState, useEffect } from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../supabase";

import TennisBall from "../components/TennisBall";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 5% 0;
  background: linear-gradient(180deg, #f5f5f5 0%, #a7c54b 120%);
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: 2px solid #000000;
  color: #000000;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  width: 200px;
  transition: 0.3s;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const StyledLink = styled(Link)`
  background-color: transparent;
  border: 2px solid #000000;
  color: #000000;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  width: 200px;
  transition: 0.3s;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const CentralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border: 2px solid #000000;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.16);
  background: linear-gradient(
    180deg,
    rgba(167, 197, 75, 0) 0%,
    rgba(167, 197, 75, 0) 10%,
    rgba(245, 245, 245, 0) 90%,
    rgba(245, 245, 245, 0) 100%
  );
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 25px;
    background-color: rgba(245, 245, 245, 0);
    z-index: 1;
  }
`;

const TennisBallWrapper = styled.div`
  position: absolute;
  top: -50px;
  z-index: 2;
`;

const Menu = ({ toggle, showWelcomeMessage }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      console.log("Deslogueado correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al desloguearse: ", error);
    }
  };

  return (
    <>
      <MenuButton onClick={toggle}>Iniciar partido</MenuButton>
      <StyledLink to="/nuevo-jugador">Crear nuevo jugador</StyledLink>
      <StyledLink to="/estadisticas">Estadísticas</StyledLink>
      <StyledLink to="/coach-perfil">Perfil</StyledLink>
      <MenuButton onClick={handleSignOut}>Desloguearse</MenuButton>
      {showWelcomeMessage ? (
        <ToastContainer position="top-right" autoClose={5000} />
      ) : null}
    </>
  );
};

const GameOptions = ({ toggle }) => {
  return (
    <>
      <StyledLink to="/board">1 jugador</StyledLink>
      <StyledLink to="#">2 jugadores</StyledLink>
      <MenuButton onClick={toggle}>Volver al menú</MenuButton>
    </>
  );
};

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
