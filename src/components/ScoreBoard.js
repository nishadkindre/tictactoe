import React from "react";
import "./styles/ScoreBoard.css";

const ScoreBoard = ({ scores, playerX }) => {
  const { xScore, oScore } = scores;
  return (
    <div className="score-board">
      <span className={`score x-score ${!playerX && "inactive"}`}>
        X - {xScore}
      </span>
      <span className={`score o-score ${playerX && "inactive"}`}>
        O - {oScore}
      </span>
    </div>
  );
};

export default ScoreBoard;
