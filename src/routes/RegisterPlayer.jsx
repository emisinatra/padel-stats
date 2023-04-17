import { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../supabase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";

const GlobalContainer = styled.div`
  background: linear-gradient(180deg, #f5f5f5 0%, #a7c54b 120%);
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: auto;
  background: transparent;
  justify-content: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: transparent;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #000000;
  color: #000000;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
  width: 200px;
  transition: 0.3s;

  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const FormContainer = styled.div`
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
`;
const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  margin-top: -1rem;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  age: Yup.date().required("La fecha de nacimiento es obligatoria"),
  position: Yup.string().required("La posición es obligatoria"),
});
const RegisterPlayer = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const { user, status } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "NOT_AUTHENTICATED") {
      navigate("/");
    }
  }, [status, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({ name, lastname, age, position });
    } catch (err) {
      toast.error(err.message);
      return;
    }

    try {
      const { error } = await supabase.from("players").insert({
        name,
        lastname,
        birthday: age,
        side: position,
      });

      if (error) {
        console.log(error);
        toast.error("Error al crear el jugador");
      } else {
        console.log("Jugador creado.");
        toast.success("Jugador creado.");
      }
    } catch (e) {
      console.log("algun error xD: ", e);
      toast.error("Error al crear el jugador ");
    }
  };

  return (
    <>
      <GlobalContainer>
        <Header title="Registrar Jugador" />
        <ToastContainer />
        <FormContainer>
          <Title>Add a new player</Title>
          {status === "AUTHENTICATED" && (
            <Form onSubmit={handleSubmit}>
              <Label>
                Name
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Lastname
                <Input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Birthday
                <Input
                  type="date"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </Label>
              <Label>
                Side
                <Select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <option>Choose</option>
                  <option value="left side">Left side</option>
                  <option value="right side">Rightside</option>
                </Select>
              </Label>
              <Button onClick={handleSubmit} type="submit">
                Create player
              </Button>
            </Form>
          )}
        </FormContainer>
        <Footer />
      </GlobalContainer>
    </>
  );
};

export default RegisterPlayer;
