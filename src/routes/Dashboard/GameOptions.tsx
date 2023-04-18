import styled from "styled-components";
import { MenuButton, StyledLink } from "./styles";
const GameOptions = ({ toggle }) => {
  return (
    <>
      <StyledLink to="/board">1 jugador</StyledLink>
      <StyledLink to="#">2 jugadores</StyledLink>
      <MenuButton onClick={toggle}>Volver al menú</MenuButton>
    </>
  );
};
export default GameOptions;
