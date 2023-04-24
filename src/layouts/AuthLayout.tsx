import { Link, Outlet } from "react-router-dom"

import { Flex } from "../components/common/Flex"
import logoSrc from "../assets/padle-stats.png"
import styled from "styled-components"

const ContentWrapper = styled.div`
  max-width: 390px;
`

export default function AuthLayout() {
  return (
    <Flex direction="column" justify="center" align="center">
      <Link to="/">
        <img src={logoSrc} />
      </Link>

      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Flex>
  )
}
