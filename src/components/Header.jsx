import React from "react";
import { supabase } from "../supabase";
import styled from "styled-components";
import { FaArrowLeft, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import Logo from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderWrapper = styled.header`
  background-color: transparent;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #212529;
  font-size: 14px;
  cursor: pointer;
  margin: 0 4px;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin-left: 0.5rem;
`;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const StyledLogo = styled(Logo)`
  width: 120px;
  height: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      console.log("Deslogueado correctamente");
    } catch (error) {
      console.error("Error al desloguearse: ", error);
    }
  };

  const handleGoBack = () => {
    if (location.pathname !== "/menu") {
      navigate(-1);
    }
  };

  return (
    <HeaderWrapper>
      <div className="flex items-center">
        <IconButton onClick={handleGoBack}>
          <FaArrowLeft />
        </IconButton>
        <Title>{title || "Tablero"}</Title>
      </div>

      <StyledLogo />

      <Nav>
        <IconButton>
          <BiCog />
        </IconButton>
        <IconButton>
          <FaUser />
        </IconButton>
        <IconButton onClick={handleSignOut}>
          <FaSignOutAlt />
        </IconButton>
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
