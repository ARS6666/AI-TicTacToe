import './App.css';
import { useEffect } from 'react';

function App() {
  return (
    <>
      <div id="gameContainer">
        <h1>Tic Tac Toe</h1>
        <div className="cell-container">
          <div cellindex="0" className="cell"></div>
          <div cellindex="1" className="cell"></div>
          <div cellindex="2" className="cell"></div>
          <div cellindex="3" className="cell"></div>
          <div cellindex="4" className="cell"></div>
          <div cellindex="5" className="cell"></div>
          <div cellindex="6" className="cell"></div>
          <div cellindex="7" className="cell"></div>
          <div cellindex="8" className="cell"></div>
        </div>
        <h2 id="statusText"></h2>
        <button id="restartBtn">Restart</button>
      </div>
    </>
  );
}

export default App;
