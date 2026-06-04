import { useRef } from "react";
import { useGame } from "../context/useGame";

const useWebSocket = () => {
  const socketRef = useRef(null);
  const pendingRef = useRef([]);

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
  const { setLastSent } = useGame();

  const connect = (roomCode, role) => {
    const socket = new WebSocket("ws://localhost:8082");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket opened to', roomCode, role);
      socket.send(JSON.stringify({
        type: "join",
        room: roomCode,
        role: role,
      }));
    };

    socket.onmessage = (event) => {
      console.log('WS message', event.data);
      const data = JSON.parse(event.data);
      try { window.__lastWs = data; } catch(e){}

      if (data.type === "joined") {
        setConnected(true);
        setRole(data.role);
        if (data.role === "player") {
          setPlayerIndex(data.playerIndex);
          setSymbol(data.symbol);
        }
        // flush any pending messages queued before join
        try {
          const pending = pendingRef.current || [];
          pending.forEach((msg) => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
              socketRef.current.send(JSON.stringify(msg));
            }
          });
          pendingRef.current = [];
        } catch (e) {
          console.warn('Failed to flush pending messages', e);
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
    const ready = socketRef.current?.readyState;
    // if socket is open, send immediately
    if (ready === WebSocket.OPEN) {
      console.log('sending', message, 'readyState', ready);
      try { setLastSent && setLastSent(JSON.stringify(message)); } catch(e){}
      try { window.__lastSent = message; } catch(e){}
      socketRef.current.send(JSON.stringify(message));
      return;
    }

    // otherwise queue the message to send after join
    console.log('queueing message, socket not open yet', message, 'readyState', ready);
    pendingRef.current = pendingRef.current || [];
    pendingRef.current.push(message);
    try { setLastSent && setLastSent(JSON.stringify(message)); } catch(e){}
  };

  return { connect, sendMessage };
};

export default useWebSocket;