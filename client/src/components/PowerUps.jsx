import { useGame } from "../context/useGame";

const PowerUps = () => {
  const {
    playerIndex,
    currentTurn,
    swapUsed,
    bombUnlocked,
    bombUsed,
    role,
    swapMode,
    setSwapMode,
    bombMode,
    setBombMode,
  } = useGame();

  const isMyTurn = currentTurn === playerIndex;
  const isPlayer = role === "player";

  const handleSwap = () => {
    setSwapMode(true);
    setBombMode(false);
  };

  const handleBomb = () => {
    setBombMode(true);
    setSwapMode(false);
  };

  if (!isPlayer) return null;

  return (
    <div>
      <button
        onClick={handleSwap}
        disabled={ !isMyTurn || swapUsed[playerIndex] || swapMode}
      >
        🔄 Swap {swapUsed[playerIndex] ? "(used)" : ""}
      </button>

      <button
        onClick={handleBomb}
        disabled={!isMyTurn || !bombUnlocked[playerIndex] || bombUsed[playerIndex] || bombMode}
      >
        💣 Bomb {!bombUnlocked[playerIndex] ? "(locked)" : bombUsed[playerIndex] ? "(used)" : ""}
      </button>

      {swapMode && <p>Select opponent's cell to swap</p>}
      {bombMode && <p>Select any cell to bomb</p>}
    </div>
  );
};

export default PowerUps;