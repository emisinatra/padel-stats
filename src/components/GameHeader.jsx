import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import { FiPlay } from "react-icons/fi";
import { FaStop } from "react-icons/fa";
import Logo from "./Logo";

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

const PlayStopButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PointsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const PointsLabel = styled.span`
  margin-right: 0.5rem;
`;

const TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

const TimerLabel = styled.span`
  margin-right: 0.5rem;
`;

function GameHeader({
  title,
  matchInProgress,
  setMatchInProgress,
  totalPoints,
  ...props
}) {
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isMatchStarted) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isMatchStarted]);

  useEffect(() => {
    if (!matchInProgress) {
      setIsMatchStarted(false);
      setElapsedTime(0);
    }
  }, [matchInProgress]);

  const startMatch = () => {
    if (isMatchStarted) return;
    setIsMatchStarted(true);
    setMatchInProgress(true);
  };

  const stopMatch = () => {
    if (!isMatchStarted) return;
    setIsMatchStarted(false);
    setMatchInProgress(false);
  };

  return (
    <Header
      {...props}
      title={
        <TitleWrapper>
          <Logo />
          <PlayStopButtonsContainer>
            <FiPlay onClick={startMatch} size="1.5em" />
            <FaStop onClick={stopMatch} size="1.5em" />
          </PlayStopButtonsContainer>
          <PointsWrapper>
            <PointsLabel>Puntos:</PointsLabel>
            <span>{totalPoints}</span>
          </PointsWrapper>
          <TimerWrapper>
            <TimerLabel>Tiempo:</TimerLabel>
            <span>{elapsedTime} s</span>
          </TimerWrapper>
        </TitleWrapper>
      }
    />
  );
}

export default GameHeader;
