const { broadcast } = require("./broadcast");

const TURN_TIMEOUT_MS = 3000;

const startTurnTimer = (room) => {
  if (!room) return;
  clearTimeout(room.timer);
  const current = room.currentTurn;

  room.timer = setTimeout(() => {
    // if game ended, don't proceed
    if (room.winner !== null || !room.gameStarted) return;

    // switch turn
    room.currentTurn = room.currentTurn === 0 ? 1 : 0;

    broadcast(room, {
      type: "timeout",
      skippedPlayer: current,
      currentTurn: room.currentTurn,
      board: room.board,
    });

    // start next timer
    startTurnTimer(room);
  }, TURN_TIMEOUT_MS);
};

module.exports = { startTurnTimer };
