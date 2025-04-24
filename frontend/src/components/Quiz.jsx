import React from "react";
import "../css/quiz.css";

const Quiz = ({ category, question, timeLeft, onAnswer }) => (
  <div className="quiz-container">
    <div className="quiz-header">
      <h2 className="quiz-category">{category}</h2>
      <div className="quiz-timer"><span>{timeLeft}s</span></div>
    </div>
    <div className="quiz-question-box">
      <p>{question?.text}</p>
    </div>
    <div className="quiz-options">
      {question?.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onAnswer(opt.isCorrect)}
          className="quiz-option-btn"
        >
          {opt.text}
        </button>
      ))}
    </div>
  </div>
);

export default Quiz;
