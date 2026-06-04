import { useGame } from "./context/useGame";
import Lobby from "./components/Lobby";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import Timer from "./components/Timer"
import PowerUps from "./components/PowerUps";

const App = () => {
  const { gameStarted, winner, currentTurn, playerIndex, symbol, role } = useGame();  // connected not needed

  const playerBox = (index) => {
    const isYou = role === 'player' && playerIndex === index;
    const sym = index === 0 ? 'X' : 'O';
    const active = currentTurn === index;
    return (
      <div className={`player-box ${active ? 'active' : ''} ${isYou ? 'you' : ''}`}>
        <div className="player-symbol">{sym}</div>
        <div className="player-label">{isYou ? 'You' : `Player ${index+1}`}</div>
      </div>
    )
  }

  if (winner !== null) {
    return (
      <div className="app">
        <Scoreboard />
      </div>
    );
  }

  if (gameStarted) {
    return (
      <div className="app">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:12}}>
            {playerBox(0)}
            {playerBox(1)}
          </div>
          <Timer />
        </div>
        <Board />
        <PowerUps />
        <div style={{position:'fixed',right:12,bottom:12,background:'rgba(0,0,0,0.4)',padding:12,borderRadius:8,fontSize:12,maxWidth:340}}>
          <strong>Debug</strong>
          <div>role: {role} {role==='player' ? `(${symbol})` : ''}</div>
          <div>you: {playerIndex !== null ? playerIndex : '—'}</div>
          <div>currentTurn: {currentTurn}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Lobby />
    </div>
  );
};

export default App;