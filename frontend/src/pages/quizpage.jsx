import React, { useState, useEffect, useRef } from "react";
import API from "../api";
import Quiz from "../components/Quiz";
import Score from "../components/Score";
import { useParams } from "react-router-dom";

const Quizpage = () => {
  const { category = "General" } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const scoreRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    API.get(`quiz/${category}`)
      .then(res => {
        setQuestions(res.data);
        setTimeLeft(res.data.length * 30);
      })
      .catch(err => console.error("❌ Failed to fetch questions", err));
  }, [category]);

  useEffect(() => {
    if (quizFinished) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && questions.length) {
      setQuizFinished(true);
      saveScore();
    }
  }, [timeLeft, quizFinished, questions]);

  const saveScore = () => {
    const email = sessionStorage.getItem("email");
    if (!email) return console.warn("⚠️ Email not found");
    API.post("save-score", { email, score: scoreRef.current })
      .then(() => console.log("✅ Score saved"))
      .catch(() => console.error("❌ Failed to save score"));
  };

  const handleAnswer = isCorrect => {
    if (isCorrect) {
      scoreRef.current += 1;
      setQuizScore(q => q + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      setQuizFinished(true);
      saveScore();
    }
  };

  if (!questions.length) return <h2>Loading questions...</h2>;
  if (quizFinished) return <Score score={quizScore} total={questions.length} />;

  return (
    <div style={{ marginTop: 80, padding: 20 }}>
      <Quiz
        category={category}
        question={questions[currentQuestion]}
        timeLeft={timeLeft}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quizpage;
