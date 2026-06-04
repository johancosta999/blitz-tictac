import { useState, useEffect } from "react";
import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";

const Lobby = () => {
  const [inputCode, setInputCode] = useState("");
  
  const { 
    roomCode, 
    setRoomCode, 
    connected, 
    status, 
    setStatus,
  } = useGame();
  
  const { connect } = useWebSocket();

  const createRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    connect(code, "player");
  };

  useEffect(() => {
    // If URL contains ?room=CODE optionally &role=viewer|player, auto-connect
    const params = new URLSearchParams(window.location.search);
    const urlRoom = params.get("room");
    const urlRole = params.get("role");
    if (urlRoom && !connected) {
      setRoomCode(urlRoom.toUpperCase());
      connect(urlRoom.toUpperCase(), urlRole === "player" ? "player" : "viewer");
    }
  }, []); // run once on mount

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
      <div className="lobby">
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
        <p className="muted">{status}</p>
      </div>
    );
  }

  const inviteLink = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setStatus("Link copied to clipboard!");
    } catch (e) {
      setStatus("Unable to copy link. Select and copy manually.");
    }
  };

  const openInNewTab = () => {
    window.open(inviteLink, "_blank");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setStatus("Room code copied to clipboard!");
    } catch (e) {
      setStatus("Unable to copy room code. Select and copy manually.");
    }
  };

  return (
    <div className="lobby">
      <h1>Blitz 4x4</h1>
      <p>Room Code:</p>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input readOnly value={roomCode} />
        <button onClick={copyCode}>Copy Code</button>
        <button onClick={() => navigator.clipboard.writeText(inviteLink).then(()=>setStatus('Link copied!'))}>Copy Invite Link</button>
        <button onClick={openInNewTab}>Open as Viewer</button>
      </div>

      <p className="muted">{status}</p>
    </div>
  );
};

export default Lobby;