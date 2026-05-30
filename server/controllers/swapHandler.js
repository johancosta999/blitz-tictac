const { checkWin } = require("../utils/checkWin");
const { broadcast } = require("../utils/broadcast");

const swapHandler = (ws, data, rooms) => {
  const room = rooms.get(ws.roomCode);
  if (!room) return;
  if (room.currentTurn !== ws.playerIndex) return;
  if (room.swapUsed[ws.playerIndex] === true) return;

  const row = data.row;
  const col = data.col;
  const opponentIndex = ws.playerIndex === 0 ? 1 : 0;
  if (room.board[row][col] !== opponentIndex) return;

  room.board[row][col] = ws.playerIndex;
  room.swapUsed[ws.playerIndex] = true;
  clearTimeout(room.timer);

  if (checkWin(room.board, ws.playerIndex)) {
    room.winner = ws.playerIndex;
    broadcast(room, {
      type: "game_over",
      winner: ws.playerIndex,
      board: room.board,
    });
    return;
  }

  room.currentTurn = room.currentTurn === 0 ? 1 : 0;
  broadcast(room, {
    type: "swap",
    board: room.board,
    currentTurn: room.currentTurn,
    swapUsed: room.swapUsed,
  });
};

module.exports = { swapHandler };