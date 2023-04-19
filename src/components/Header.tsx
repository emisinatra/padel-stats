import { FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";

import { supabase } from "../supabase";
import Logo from "./Logo";

const HeaderWrapper = styled.header`
  background-color: transparent;
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
      <Logo width={132} />

      <IconButtonGroup>
        <IconButton>
          <FaCog size={16} />
        </IconButton>

        <IconButton>
          <FaUser size={16} />
        </IconButton>

        <IconButton onClick={handleSignOut}>
          <FaSignOutAlt size={16} />
        </IconButton>
      </IconButtonGroup>
    </HeaderWrapper>
  );
}
