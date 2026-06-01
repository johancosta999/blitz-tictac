import { useState } from "react";
import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";

const Lobby = () => {
  const [inputCode, setInputCode] = useState("");
  
  const { 
    roomCode, 
    setRoomCode, 
    connected, 
    status, 
  } = useGame();
  
  const { connect } = useWebSocket();

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    connect(code, "player");
  };

  const joinRoom = () => {
    if (!inputCode.trim()) return;
    setRoomCode(inputCode);
    connect(inputCode, "player");
  };

  const watchRoom = () => {
    if (!inputCode.trim()) return;
    setRoomCode(inputCode);
    connect(inputCode, "viewer");
  };

  if (!connected) {
    return (
      <div>
        <h1>Blitz 4x4</h1>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
        />
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={watchRoom}>Watch Room</button>
        <button onClick={createRoom}>Create Room</button>
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Blitz 4x4</h1>
      <p>Room Code: <b>{roomCode}</b></p>
      <p>{status}</p>
    </div>
  );
};

export default Lobby;