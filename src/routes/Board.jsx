import { FaUndo } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";
import { useMatch } from "../contexts/MatchContext";

const HITS = {
  WINNERS: {
    ACE: "ACE",
    BANDEJA: "BANDEJA",
    DRIVE: "DRIVE",
    REVES: "REVES",
    SALIDA_PARED_DRIVE: "SALIDA_PARED_DRIVE",
    SALIDA_PARED_REVES: "SALIDA_PARED_REVES",
    SMASH_PLANO: "SMASH_PLANO",
    SMASH_X3: "SMASH_X3",
    SMASH_X4: "SMASH_X4",
    VIBORA: "VIBORA",
    VOLEA_DRIVE: "VOLEA_DRIVE",
    VOLEA_REVES: "VOLEA_REVES",
  },
  ERRORS: {
    BANDEJA: "BANDEJA",
    DOBLE_FALTA: "DOBLE_FALTA",
    DRIVE: "DRIVE",
    GLOBO_DRIVE: "GLOBO_DRIVE",
    GLOBO_REVES: "GLOBO_REVES",
    REVES: "REVES",
    SALIDA_PARED_DRIVE: "SALIDA_PARED_DRIVE",
    SALIDA_PARED_REVES: "SALIDA_PARED_REVES",
    SMASH_PLANO: "SMASH_PLANO",
    SMASH_X3: "SMASH_X3",
    SMASH_X4: "SMASH_X4",
    VIBORA: "VIBORA",
    VOLEA_DRIVE: "VOLEA_DRIVE",
    VOLEA_REVES: "VOLEA_REVES",
  },
};

const BUTTON_BASE_STYLES = "border p-4";

function Board({ addPoint, points, undo }) {
  const [mode, setMode] = useState("WINNERS");

  const addWinnerPoint = (hit) => addPoint("WINNERS", hit);
  const addErrorPoint = (hit) => addPoint("ERRORS", hit);
  const winners = points.filter((point) => point.type === "WINNERS");
  const errors = points.filter((point) => point.type === "ERRORS");

  const { start, pause, stop, elapsedTime } = useMatch();

  return (
    <div className="flex flex-col gap-4 p-4">
      {elapsedTime}
      <button onClick={() => start()}>Play</button>
      <button onClick={() => pause()}>Pause</button>
      <button onClick={() => stop()}>Stop</button>

      <div className="flex justify-center gap-4">
        <button
          className={clsx(
            "border p-4 transition duration-500",
            mode === "WINNERS" && "border-black"
          )}
          onClick={() => setMode("WINNERS")}
        >
          WINNERS {winners.length}
        </button>

        <button
          className={clsx(
            "border p-4 transition duration-500",
            mode === "ERRORS" && "border-black"
          )}
          onClick={() => setMode("ERRORS")}
        >
          ERRORS {errors.length}
        </button>

        <button className="border p-4" onClick={undo}>
          <FaUndo />
        </button>
      </div>

      <div>
        {mode === "WINNERS" && (
          <div className="grid grid-cols-2 gap-4">
            <button
              className={BUTTON_BASE_STYLES}
              onClick={() => addWinnerPoint(HITS.WINNERS.ACE)}
            >
              ACE
            </button>

            <button
              className={BUTTON_BASE_STYLES}
              onClick={() => addWinnerPoint("BANDEJA")}
            >
              BANDEJA
            </button>

            <div className="col-span-2 grid grid-cols-3 gap-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("DRIVE")}
              >
                DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("REVES")}
              >
                REVES
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("VIBORA")}
              >
                VIBORA
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("SALIDA_PARED_DRIVE")}
              >
                SALIDA_PARED_DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("SALIDA_PARED_REVES")}
              >
                SALIDA_PARED_REVES
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("VOLEA_DRIVE")}
              >
                VOLEA_DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("VOLEA_REVES")}
              >
                VOLEA_REVES
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("SMASH_PLANO")}
              >
                SMASH_PLANO
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("SMASH_X3")}
              >
                SMASH_X3
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addWinnerPoint("SMASH_X4")}
              >
                SMASH_X4
              </button>
            </div>
          </div>
        )}

        {mode === "ERRORS" && (
          <div className="grid grid-cols-2 gap-4">
            <button
              className={BUTTON_BASE_STYLES}
              onClick={() => addErrorPoint("BANDEJA")}
            >
              BANDEJA
            </button>

            <button
              className={BUTTON_BASE_STYLES}
              onClick={() => addErrorPoint("DOBLE_FALTA")}
            >
              DOBLE_FALTA
            </button>

            <div className="col-span-2 grid grid-cols-3 gap-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("DRIVE")}
              >
                DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("REVES")}
              >
                REVES
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("VIBORA")}
              >
                VIBORA
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("GLOBO_DRIVE")}
              >
                GLOBO_DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("GLOBO_REVES")}
              >
                GLOBO_REVES
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("SALIDA_PARED_DRIVE")}
              >
                SALIDA_PARED_DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("SALIDA_PARED_REVES")}
              >
                SALIDA_PARED_REVES
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("VOLEA_DRIVE")}
              >
                VOLEA_DRIVE
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("VOLEA_REVES")}
              >
                VOLEA_REVES
              </button>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-4 border p-4">
              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("SMASH_PLANO")}
              >
                SMASH_PLANO
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("SMASH_X3")}
              >
                SMASH_X3
              </button>

              <button
                className={BUTTON_BASE_STYLES}
                onClick={() => addErrorPoint("SMASH_X4")}
              >
                SMASH_X4
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Route() {
  const [points, setPoints] = useState([]);

  const addPoint = (type, hit) => {
    setPoints((prev) => [...prev, { type, hit }]);
  };

  const undo = () => {
    setPoints((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <div>
      <Board addPoint={addPoint} points={points} undo={undo} />
    </div>
  );
}

export default Route;
