import { useGame } from "./context/useGame";
import Lobby from "./components/Lobby";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  const { connected, gameStarted, winner } = useGame();

  if (??) {
    return <Scoreboard />;
  }

  if (??) {
    return <Board />;
  }

  return <Lobby />;
};

export default App;