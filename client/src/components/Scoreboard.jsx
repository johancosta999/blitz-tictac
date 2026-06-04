import { useGame } from "../context/useGame";

const Scoreboard = () => {
  const { winner, playerIndex, role } = useGame();

  const getMessage = () => {
    if (winner === null) return "🤝 It's a draw!";
    if (role === "viewer") return `Player ${winner === 0 ? "X" : "O"} wins!`;
    if (winner === playerIndex) return "🎉 You win!";
    return "😔 You lose!";
  };

  return (
    <div className="scoreboard">
      <h1>{getMessage()}</h1>
      <button onClick={() => window.location.reload()}>
        Play Again
      </button>
    </div>
  );
};

export default Scoreboard;