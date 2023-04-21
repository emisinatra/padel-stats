import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

import { fadeIn } from "../keyframes";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Center } from "../components";
import { BeatLoader } from "react-spinners";

const ContentContainer = styled.div`
  animation-duration: 1000ms;
  animation-name: ${fadeIn};
  overflow-y: scroll;
`;

export default function AppLayout() {
  const { status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "NOT_AUTHENTICATED") navigate("/sign-in");
  }, [status, navigate]);

  if (status === "LOADING") {
    return (
      <Center style={{ height: "100vh" }}>
        <BeatLoader />
      </Center>
    );
  }

  return (
    <>
      <Header />

      <ContentContainer>
        <Outlet />
      </ContentContainer>

      <Footer />
    </>
  );
}
