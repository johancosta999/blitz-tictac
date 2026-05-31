import { useRef } from "react";
import { useGame } from "../context/useGame";

const useWebSocket = () => {
  const socketRef = useRef(null);

  const {
    setBoard,
    setCurrentTurn,
    setPlayerIndex,
    setSymbol,
    setRole,
    setConnected,
    setGameStarted,
    setWinner,
    setSwapUsed,
    setBombUsed,
    setStatus,
  } = useGame();

  const connect = (roomCode, role) => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "join",
        room: roomCode,
        role: role,
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "joined") {
        setConnected(true);
        setRole(data.role);
        if (data.role === "player") {
          setPlayerIndex(data.playerIndex);
          setSymbol(data.symbol);
        }
      }

      if (data.type === "game_start") {
        setGameStarted(true);
        setBoard(data.board);
        setCurrentTurn(data.currentTurn);
        setStatus("Game started!");
      }

      if (data.type === "move" || data.type === "swap") {
        setBoard(data.board);
        setCurrentTurn(data.currentTurn);
        setSwapUsed(data.swapUsed);
      }

      if (data.type === "bomb") {
        setBoard(data.board);
        setCurrentTurn(data.currentTurn);
        setBombUsed(data.bombUsed);
      }

      if (data.type === "timeout") {
        setCurrentTurn(data.currentTurn);
        setStatus(`Player ${data.skippedPlayer === 0 ? "X" : "O"} was skipped!`);
      }

      if (data.type === "game_over") {
        setWinner(data.winner);
        setBoard(data.board);
        setGameStarted(false);
      }

      if (data.type === "room_full") {
        setStatus("Room is full!");
      }

      if (data.type === "player_left") {
        setStatus("Other player left the game");
        setGameStarted(false);
      }
    };

    socket.onclose = () => {
      setConnected(false);
    };
  };

  const sendMessage = (message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { connect, sendMessage };
};

export default useWebSocket;