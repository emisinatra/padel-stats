import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";

import { supabase } from "../supabase";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
`;

const IconButtonGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #212529;
  cursor: pointer;
  font-size: 14px;
  margin: 0 4px;
`;

export function Header() {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      // TODO handle sign out error
    }
  };

  return (
    <HeaderWrapper>
      <Link to="/app">
        <Logo />
      </Link>

      <IconButtonGroup>
        <IconButton as={Link} to="/app/me">
          <FaUser size={24} />
        </IconButton>

        <IconButton onClick={handleSignOut}>
          <FaSignOutAlt size={24} />
        </IconButton>
      </IconButtonGroup>
    </HeaderWrapper>
  );
}
