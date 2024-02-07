import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
import Toggle from "./components/Toggle";
import useLocalStorage from "use-local-storage";

const App = () => {
  const WIN_CONDTNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  const handleBoxClick = (boxId) => {
    // console.log(boxId);
    const updatedBoard = board.map((value, index) => {
      if (index === boxId) {
        return playerX ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }
    // console.log(scores);
    setBoard(updatedBoard);
    setPlayerX(!playerX);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDTNS.length; i++) {
      const [x, y, z] = WIN_CONDTNS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        // console.log(board[x]);
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setPlayerX(!playerX);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      <ScoreBoard scores={scores} playerX={playerX} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
};

export default App;
