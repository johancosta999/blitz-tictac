const { broadcast } = require("../utils/broadcast");

const timeoutHandler = (ws, data, rooms) => {
  const room = rooms.get(ws.roomCode);
  if (!room) return;
  if (room.currentTurn !== ws.playerIndex) return;

  clearTimeout(room.timer);

  room.currentTurn = room.currentTurn === 0 ? 1 : 0;
  broadcast(room, {
    type: "timeout",
    skippedPlayer: ws.playerIndex,
    currentTurn: room.currentTurn,
    board: room.board,
  });
};

module.exports = { timeoutHandler };