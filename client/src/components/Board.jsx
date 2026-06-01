import { useGame } from "../context/useGame";
import useWebSocket from "../hooks/useWebSocket";
import Cell from "./Cell";

const Board = () => {
  const { board, currentTurn, playerIndex, role } = useGame();
  const { sendMessage } = useWebSocket();

  const handleClick = (row, col) => {
    if (role !== "player") return; // not a player
    if (currentTurn !== playerIndex) return; // not your turn
    if (board[row][col] !== null) return; // cell taken
    sendMessage({ type: "move", row: row, col: col });
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
