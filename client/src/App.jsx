import { useGame } from "./context/useGame";
import Lobby from "./components/Lobby";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  const { gameStarted, winner } = useGame();  // connected not needed

  if (winner !== null) {
    return <Scoreboard />;
  }

  if (gameStarted) {
    return <Board />;
  }

  return <Lobby />;
};

export default App;