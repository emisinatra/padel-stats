import styled from "styled-components";
import { MenuButton, StyledLink } from "./styles";
import { supabase } from "../../supabase";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
export default Menu;
