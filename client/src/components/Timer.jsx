import { useState, useEffect } from "react";
import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(2);

  const { currentTurn, playerIndex, gameStarted, role } = useGame();
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (timeLeft === 0 &&
        role === "player" &&
        currentTurn === playerIndex) {
      sendMessage({ type: "timeout" });
    }
  }, [timeLeft, role, currentTurn, playerIndex, sendMessage]);

  return (
    <div>
      <p>Time left: {timeLeft}s</p>
    </div>
  );
};

export default Timer;