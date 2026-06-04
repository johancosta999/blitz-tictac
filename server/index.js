const WebSocket = require("ws");
const { createRoom } = require("./models/Room");
const { broadcast } = require("./utils/broadcast");
const { joinHandler } = require("./controllers/joinHandler");
const { moveHandler } = require("./controllers/moveHandler");
const { swapHandler } = require("./controllers/swapHandler");
const { bombHandler } = require("./controllers/bombHandler");
const { timeoutHandler } = require("./controllers/timeoutHandler");

const PORT = process.env.PORT || 8082;
const wss = new WebSocket.Server({ port: PORT });

console.log(`Server running on port ${PORT}`);

const rooms = new Map();

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (rawMessage) => {
    try {
      const data = JSON.parse(rawMessage);

      if (data.type === "join") joinHandler(ws, data, rooms);
      if (data.type === "move") moveHandler(ws, data, rooms);
      if (data.type === "swap") swapHandler(ws, data, rooms);
      if (data.type === "bomb") bombHandler(ws, data, rooms);
      if (data.type === "timeout") timeoutHandler(ws, data, rooms);

    } catch (err) {
      console.error("Invalid message", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");

    const roomCode = ws.roomCode;
    if (!roomCode || !rooms.has(roomCode)) return;

    const room = rooms.get(roomCode);

    // remove player
    if (ws.role === "player") {
      room.players = room.players.filter(p => p.socket !== ws);
      clearTimeout(room.timer);

      // notify everyone the player left
      broadcast(room, {
        type: "player_left",
        playerIndex: ws.playerIndex,
      });
    }

    // remove viewer
    if (ws.role === "viewer") {
      room.viewers = room.viewers.filter(v => v !== ws);
    }

    // delete room if empty
    if (room.players.length === 0 && room.viewers.length === 0) {
      rooms.delete(roomCode);
      console.log(`Room ${roomCode} deleted`);
    }
  });
});