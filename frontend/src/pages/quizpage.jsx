import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Quiz from "../components/Quiz";
import Score from "../components/Score";
import { useParams } from "react-router-dom";

const Quizepage = () => {
  const { category = "General" } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const scoreRef = useRef(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch quiz questions
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/quiz/${category}`)
      .then((res) => {
        const data = res.data;
        setQuestions(data);
        setTimeLeft(data.length * 30); // 🕒 30 seconds per question
      })
      .catch((err) => console.error("❌ Failed to fetch questions", err));
  }, [category]);

  // Global timer
  useEffect(() => {
    if (quizFinished) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && questions.length > 0) {
      setQuizFinished(true);
      saveScore();
    }
  }, [timeLeft, quizFinished, questions.length]);

  // Save score to backend
  const saveScore = () => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      console.warn("⚠️ Email not found in session storage");
      return;
    }

    axios
      .post("http://localhost:8000/api/save-score", {
        email,
        score: scoreRef.current,
      })
      .then((res) => console.log("✅ Score saved:", res.data))
      .catch((err) => console.error("❌ Failed to save score", err));
  };

  // Handle user's answer
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      scoreRef.current += 1;
      setQuizScore((prev) => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      saveScore();
    }
  };

  // UI rendering
  if (!questions.length) return <h2>Loading questions...</h2>;
  if (quizFinished)
    return <Score score={quizScore} total={questions.length} />;

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

export default Quizepage;