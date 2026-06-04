import { useState, useEffect, useRef } from "react";
import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(2);
  const { currentTurn, playerIndex, gameStarted, role } = useGame();
  const { sendMessage } = useWebSocket();
  const isFirstTick = useRef(true);

  useEffect(() => {
    if (!gameStarted) return;

    isFirstTick.current = true;

    const interval = setInterval(() => {
      if (isFirstTick.current) {
        isFirstTick.current = false;
        setTimeLeft(2);
        return;
      }

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (role === "player" && currentTurn === playerIndex) {
            sendMessage({ type: "timeout" });
          }
          return 2;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTurn, gameStarted]); // eslint-disable-line

  return (
    <div>
      <p>Time left: {timeLeft}s</p>
    </div>
  );
};

export default Timer;