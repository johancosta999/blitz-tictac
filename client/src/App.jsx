import { useGame } from "./context/useGame";
import Lobby from "./components/Lobby";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import Timer from "./components/Timer"
import PowerUps from "./components/PowerUps";

const App = () => {
  const { gameStarted, winner } = useGame();  // connected not needed

  if (winner !== null) {
    return <Scoreboard />;
  }

  if (gameStarted) {
  return (
    <div>
      <Timer />
      <Board />
      <PowerUps />
    </div>
  );
}

  return <Lobby />;
};

export default App;