import { useState } from "react";

import styled from "styled-components";
import { keyframes } from "styled-components";
import { createClient } from "@supabase/supabase-js";

import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import Footer from "../components/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../supabase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding-bottom: 50px;
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #a7c54b;
  color: #000000;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 15px;
  font-size: 16px;
  padding: 10px;
  border: 2px solid #a7c54b;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #4b6ea7;
    box-shadow: 0 0 0 3px rgba(75, 110, 167, 0.3);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content;
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f5f5 0%, #a7c54b 100%);
`;

const MainContent = styled.div`
  flex: 1;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const StyledLogo = styled(Logo)`
  margin-top: -100px;
  width: 350px;
  height: 390px;
`;
const Slogan = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin: 10px;
  animation: ${fadeIn} 2s ease-in-out;
  font-family: "Poppins", sans-serif;
`;

const Login = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("You have successfully logged in!");
      setTimeout(() => {
        navigate("/tablero");
      }, 3000);
    } catch (error) {
      toast.error("Authentication error: " + error.message);
    }
  };

  const handleSignUpFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      toast.success(
        "Thank you for submitting your request. An administrator will review your information within the next few hours and contact you via email."
      );
    } catch (error) {
      console.error("Error signing up: ", error);
      toast.error("Sign up error: " + error.message);
    }
  };

  return (
    <GridContainer>
      <ToastContainer />
      <MainContent>
        <Container>
          <StyledLogo />
          <Slogan>Join the revolutionary world of padel stats!</Slogan>
          {!showLoginForm && !showRequestForm && !requestSent && (
            <ButtonsContainer>
              <Button onClick={() => setShowLoginForm(true)}>Sign in</Button>
              <Button onClick={() => setShowRequestForm(true)}>Sign up</Button>
            </ButtonsContainer>
          )}

          {showLoginForm && (
            <Form onSubmit={handleLoginFormSubmit}>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <ButtonsContainer>
                <Button onClick={() => setShowLoginForm(false)}>Cancel</Button>
                <Button type="submit">Login</Button>
              </ButtonsContainer>
            </Form>
          )}

          {showRequestForm && (
            <Form onSubmit={handleSignUpFormSubmit}>
              <Input
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <ButtonsContainer>
                <Button onClick={() => setShowRequestForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Sign in</Button>
              </ButtonsContainer>
            </Form>
          )}
        </Container>
      </MainContent>
      <Footer />
    </GridContainer>
  );
};

export default Login;
