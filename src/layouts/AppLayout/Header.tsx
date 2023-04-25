import { FaUser, FaSignOutAlt } from "react-icons/fa"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { supabase } from "../../supabase"
import Logo from "../../assets/padle-stats.svg"

const HeaderWrapper = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  background-color: transparent;
`

const IconButtonGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #212529;
  cursor: pointer;
  font-size: 14px;
  margin: 0 4px;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 48px;
    width: auto;
  }
`

export function Header() {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {}
  }

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={Logo} alt="Padel Stats Logo" />
      </LogoWrapper>
      <IconButtonGroup>
        <IconButton as={Link} to="#">
          <FaUser size={24} />
        </IconButton>

        <IconButton onClick={handleSignOut}>
          <FaSignOutAlt size={24} />
        </IconButton>
      </IconButtonGroup>
    </HeaderWrapper>
  )
}
