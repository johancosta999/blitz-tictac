import { useState } from "react";
import { GameContext } from "./GameContext";

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [playerIndex, setPlayerIndex] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [role, setRole] = useState(null);
  const [connected, setConnected] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [swapUsed, setSwapUsed] = useState({ 0: false, 1: false });
  const [bombUnlocked, setBombUnlocked] = useState({ 0: false, 1: false });
  const [bombUsed, setBombUsed] = useState({ 0: false, 1: false });
  const [status, setStatus] = useState("");
  const [swapMode, setSwapMode] = useState(false);
  const [bombMode, setBombMode] = useState(false);
  const [lastSent, setLastSent] = useState(null);

  return (
    <GameContext.Provider value={{
      board, setBoard,
      currentTurn, setCurrentTurn,
      playerIndex, setPlayerIndex,
      symbol, setSymbol,
      role, setRole,
      connected, setConnected,
      roomCode, setRoomCode,
      gameStarted, setGameStarted,
      winner, setWinner,
      swapUsed, setSwapUsed,
      bombUnlocked, setBombUnlocked,
      bombUsed, setBombUsed,
      status, setStatus,
      swapMode, setSwapMode,
      bombMode, setBombMode,
      lastSent, setLastSent,
    }}>
      {children}
    </GameContext.Provider>
  );
};