import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const cells = document.querySelectorAll(".cell");
    const statustext = document.querySelector("#statusText");
    const restartBtn = document.querySelector("#restartBtn");
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = false;

    initializeGame();

    function initializeGame() {
      running = true;
      cells.forEach(cell => cell.addEventListener("click", cellClicked));
      restartBtn.addEventListener("click", restartGame);
      statustext.textContent = `${currentPlayer}'s turn`;
    }

    function cellClicked() {
      const cellIndex = this.getAttribute("cellindex");
      if (options[cellIndex] !== "" || !running) {
        return;
      }
      updateCell(this, cellIndex);
      checkWinner();
    }

    function updateCell(cell, index) {
      options[index] = currentPlayer;
      cell.textContent = currentPlayer;
    }

    function changePlayer() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statustext.textContent = `${currentPlayer}'s turn`;
    }

    function checkWinner() {
      let roundWon = false;
      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if (cellA === "" || cellB === "" || cellC === "") {
          continue;
        }
        if (cellA === cellB && cellB === cellC) {
          roundWon = true;
          break;
        }
      }
      if (roundWon) {
        statustext.textContent = `${currentPlayer} wins!`;
        running = false;
      } else if (!options.includes("")) {
        statustext.textContent = `Draw!`;
        running = false;
      } else {
        changePlayer();
      }
    }

    function restartGame() {
      options = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      statustext.textContent = `${currentPlayer}'s turn`;
      cells.forEach(cell => cell.textContent = "");
      running = true;
    }
  }, []);

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
