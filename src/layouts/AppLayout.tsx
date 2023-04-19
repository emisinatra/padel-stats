import { Outlet, useNavigate } from "react-router-dom";

import { Center } from "../components";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const AppWrapper = styled(Center)`
  height: 100vh;
`;

export default function AppLayout() {
  const { status } = useAuth();
  const navigate = useNavigate();
  if (status === "NOT_AUTHENTICATED") navigate("/sign-in");

  return (
    <AppWrapper>
      <Header />
      <Outlet />
      <Footer />
    </AppWrapper>
  );
}
