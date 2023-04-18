import constate from "constate";
import { useEffect, useState } from "react";

const hits = {
  winners: {
    ace: "ace",
    bandeja: "bandeja",
    drive: "drive",
    reves: "reves",
    salida_pared_drive: "salida_pared_drive",
    salida_pared_reves: "salida_pared_reves",
    smash_plano: "smash_plano",
    smash_x3: "smash_x3",
    smash_x4: "smash_x4",
    vibora: "vibora",
    volea_drive: "volea_drive",
    volea_reves: "volea_reves",
  },
  errors: {
    bandeja: "bandeja",
    doble_falta: "doble_falta",
    drive: "drive",
    globo_drive: "globo_drive",
    globo_reves: "globo_reves",
    reves: "reves",
    salida_pared_drive: "salida_pared_drive",
    salida_pared_reves: "salida_pared_reves",
    smash_plano: "smash_plano",
    smash_x3: "smash_x3",
    smash_x4: "smash_x4",
    vibora: "vibora",
    volea_drive: "volea_drive",
    volea_reves: "volea_reves",
  },
} as const;

export const [MatchProvider, useMatch] = constate(() => {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState("STOPPED");
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (status === "PLAYING") {
      const id = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      setIntervalId(id);
    }

    return () => clearInterval(intervalId as number);
  }, [status]);

  const play = () => setStatus("PLAYING");
  const pause = () => setStatus("PAUSED");

  const stop = () => {
    setStatus("STOPPED");
    setTime(0);
  };

  return { time, status, play, pause, stop };
});
