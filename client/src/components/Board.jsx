import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";
import Cell from "./Cell";

const Board = () => {
  const { board, currentTurn, playerIndex, role, swapMode, setSwapMode, bombMode, setBombMode } = useGame();
  const { sendMessage } = useWebSocket();

  const handleClick = (row, col) => {
  if (role !== "player") return;
  if (currentTurn !== playerIndex) return;

  if (swapMode) {
    // cell must belong to opponent
    const opponentIndex = playerIndex === 0 ? 1 : 0;
    if (board[row][col] !== opponentIndex) return;
    sendMessage({ type: "swap", row, col });
    setSwapMode(false);
    return;
  }

  if (bombMode) {
    if (board[row][col] === null) return;
    sendMessage({ type: "bomb", row, col });
    setBombMode(false);
    return;
  }

  if (board[row][col] !== null) return;
  sendMessage({ type: "move", row, col });
};

  if (!board) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 80px)",
        gap: "8px",
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            row={rowIndex}
            col={colIndex}
            onClick={handleClick}
          />
        )),
      )}
    </div>
  );
};

export default Board;
