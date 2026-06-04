const { checkWin } = require("../utils/checkWin");
const { checkThreeInARow } = require("../utils/checkThreeInARow");
const { checkDraw } = require("../utils/checkDraw");
const { broadcast } = require("../utils/broadcast");

const moveHandler = (ws, data, rooms) => {
  console.log('moveHandler called by', ws.playerIndex, 'data:', data);

  // Step 1 - get room and validate
  const room = rooms.get(ws.roomCode);
  if (!room) return;
  if (room.currentTurn !== ws.playerIndex) return;

  const row = data.row;
  const col = data.col;
  if (room.board[row][col] !== null) return;

  // Step 2 - make the move
  room.board[row][col] = ws.playerIndex;
  clearTimeout(room.timer);

  // Step 3 - check win
  if (checkWin(room.board, ws.playerIndex)) {
    room.winner = ws.playerIndex;
    broadcast(room, {
      type: "game_over",
      winner: ws.playerIndex,
      board: room.board,
    });
    return;
  }

  // Step 4 - check draw
  if (checkDraw(room.board)) {
    broadcast(room, {
      type: "game_over",
      winner: null,
      board: room.board,
    });
    return;
  }

  // Step 5 - check bomb unlock
  if (checkThreeInARow(room.board, ws.playerIndex)) {
    room.bombUnlocked[ws.playerIndex] = true;
  }

  // Step 6 - switch turn and broadcast
  room.currentTurn = room.currentTurn === 0 ? 1 : 0;
  broadcast(room, {
    type: "move",
    board: room.board,
    currentTurn: room.currentTurn,
    bombUnlocked: room.bombUnlocked,
    swapUsed: room.swapUsed,
  });

  // start timer for next turn
  const { startTurnTimer } = require("../utils/turnTimer");
  startTurnTimer(room);

};

module.exports = { moveHandler };