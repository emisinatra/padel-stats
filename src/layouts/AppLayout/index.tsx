import { BeatLoader } from "react-spinners";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { useAuth } from "../../contexts/AuthContext";

export default function AppLayout() {
  const { status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "NOT_AUTHENTICATED") navigate("/sign-in");
  }, [status, navigate]);

  if (status === "LOADING") return <BeatLoader />;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
