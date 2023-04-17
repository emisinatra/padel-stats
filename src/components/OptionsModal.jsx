import { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const OptionsModal = ({
  tipo,
  golpe,
  opciones,
  handleCloseModal,
  stats,
  setStats,
  setSelectedOption,
}) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const handleChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const handleSubmit = () => {
    if (opcionSeleccionada) {
      setStats((prevStats) => {
        const newStats = { ...prevStats };
        newStats[tipo][opcionSeleccionada]++;
        return newStats;
      });
      setSelectedOption(opcionSeleccionada);
      handleCloseModal();
    } else {
      alert("Por favor, elige una opción antes de confirmar.");
      return;
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h3>Selecciona la opción de {golpe}</h3>
        <select value={opcionSeleccionada} onChange={handleChange}>
          <option value="">Elige una opción</option>
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Confirmar</button>
      </ModalContent>
    </ModalContainer>
  );
};

export default OptionsModal;
