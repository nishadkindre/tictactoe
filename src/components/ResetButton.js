import React from "react";
import "./styles/ResetButton.css";

const ResetButton = ({ resetBoard }) => {
  return (
    <button className="reset-button" onClick={resetBoard}>
      RESET
    </button>
  );
};

export default ResetButton;
