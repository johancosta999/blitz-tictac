const { checkDraw } = require("../utils/checkDraw");
const { broadcast } = require("../utils/broadcast");

const bombHandler = (ws, data, rooms) => {
  const room = rooms.get(ws.roomCode);
  if (!room) return;
  if (room.currentTurn !== ws.playerIndex) return;
  if (!room.bombUnlocked[ws.playerIndex]) return;
  if (room.bombUsed[ws.playerIndex] === true) return;

  const row = data.row;
  const col = data.col;
  if (room.board[row][col] === null) return;

  room.board[row][col] = null;
  room.bombUsed[ws.playerIndex] = true;
  clearTimeout(room.timer);

  if (checkDraw(room.board)) {
    broadcast(room, {
      type: "game_over",
      winner: null,
      board: room.board,
    });
    return;
  }

  room.currentTurn = room.currentTurn === 0 ? 1 : 0;
  broadcast(room, {
    type: "bomb",
    board: room.board,
    currentTurn: room.currentTurn,
    bombUsed: room.bombUsed,
  });
};

module.exports = { bombHandler };