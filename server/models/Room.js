const createRoom = () => {
  return {

    // The 4x4 grid - 4 rows, each with 4 null cells (null = empty)
    board: Array(4).fill(null).map(() => Array(4).fill(null)),

    // Array of player objects - each player looks like:
    // { socket, playerIndex: 0 or 1, symbol: "X" or "O", name: "Player 1" }
    players: [],

    // Array of viewer sockets - just the raw socket connections
    viewers: [],

    // Whose turn is it? 0 = player one, 1 = player two
    currentTurn: 0,

    // Has the game started? Only true when 2 players have joined
    gameStarted: false,

    // Winner's player index (0 or 1), null if no winner yet
    winner: null,

    // Reference to the active turn timer so we can cancel it when a move is made
    timer: null,

    // Has each player used their swap?
    swapUsed: {
      0: false,// ??
      1: false,// ??
    },

    // Has each player unlocked their bomb? Unlocked by getting 3 in a row
    bombUnlocked: {
      0: false,
      1: false,
    },

    // Has each player used their bomb?
    bombUsed: {
      0: false,// ??
      1: false// ??
    },

  };
};

module.exports = { createRoom };