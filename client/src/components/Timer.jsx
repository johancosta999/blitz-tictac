import { useState, useEffect, useRef } from "react";
import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";

const TURN_MS = 3000;

const Timer = () => {
  const [msLeft, setMsLeft] = useState(TURN_MS);
  const { currentTurn, playerIndex, gameStarted, role } = useGame();
  const { sendMessage } = useWebSocket();
  const rafRef = useRef(null);
  const endRef = useRef(Date.now() + TURN_MS);

  useEffect(() => {
    if (!gameStarted) return;
    // when currentTurn changes, reset timer
    endRef.current = Date.now() + TURN_MS;

    const tick = () => {
      const remaining = Math.max(0, endRef.current - Date.now());
      setMsLeft(remaining);
      if (remaining <= 0) {
        // when timer hits zero, if we're the active player send timeout
        if (role === "player" && currentTurn === playerIndex) {
          sendMessage({ type: "timeout" });
        }
        return; // stop updating until next turn change
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentTurn, gameStarted]); // eslint-disable-line

  const seconds = Math.floor(msLeft / 1000);
  const ms = msLeft % 1000;

  return (
    <div>
      <p>Time left: {seconds}.{String(ms).padStart(3,'0')}s</p>
    </div>
  );
};

export default Timer;