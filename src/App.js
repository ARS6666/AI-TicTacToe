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
      bestMove();
      cells.forEach(cell => cell.addEventListener("click", cellClicked));
      restartBtn.addEventListener("click", restartGame);
      statustext.textContent = `${currentPlayer}'s turn`;
    }

    function cellClicked() {
      const cellIndex = this.getAttribute("cellindex");
      if (options[cellIndex] !== "" || !running || currentPlayer === "X") {
        return;
      }
      updateCell(this, cellIndex);
      checkWinner();
      bestMove();
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
        running = false;
        statustext.textContent = `${currentPlayer} WON!`;
      } else if (!options.includes("")) {
        statustext.textContent = `Draw`;
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
      bestMove();
    }

    function bestMove() {
      let bestScore = -Infinity;
      let move;
      if (running) {
        for (let i = 0; i < 9; i++) {
          if (options[i] === "") {
            options[i] = "X";
            let score = minimax(options, 0, false);
            options[i] = "";
            if (score > bestScore) {
              bestScore = score;
              move = i;
            }
          }
        }
        updateCell(cells[move], move);
        checkWinner();
      }
      return bestScore;
    }

    function minimax(options, depth, isMaximizing) {
      let scores = {
        X: 1,
        O: -1,
        Draw: 0
      };
      let result = checkWin();
      if (result !== null) {
        return scores[result];
      }
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (options[i] === "") {
            options[i] = "X";
            let score = minimax(options, depth + 1, false);
            options[i] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (options[i] === "") {
            options[i] = "O";
            let score = minimax(options, depth + 1, true);
            options[i] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }

    function checkWin() {
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
          return options[a];
        }
      }
      return options.includes("") ? null : "Draw";
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
