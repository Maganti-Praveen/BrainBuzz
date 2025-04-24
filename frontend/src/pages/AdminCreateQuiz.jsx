import React, { useState } from 'react';
import '../css/createquiz.css';

const AdminCreateQuiz = () => {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'question' || field === 'correctAnswer') {
      updatedQuestions[index][field] = value;
    } else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      category,
      questions,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/quiz/add-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('✅ Quiz added successfully!');
        setCategory('');
        setQuestions([
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
          },
        ]);
      } else {
        alert(data.message || '❌ Error adding quiz.');
      }
    } catch (error) {
      console.error('❌ Error adding quiz:', error);
      alert('Error adding quiz. Please check console for details.');
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-heading">Create New Quiz</h2>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Enter quiz category"
          />
        </div>

        {questions.map((q, idx) => (
          <div className="question-block" key={idx}>
            <h3>Question {idx + 1}</h3>
            <input
              type="text"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleQuestionChange(idx, 'question', e.target.value)}
              required
            />

            <div className="options-container">
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleQuestionChange(idx, i, e.target.value)}
                  required
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Correct answer"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(idx, 'correctAnswer', e.target.value)}
              required
            />

            {questions.length > 1 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeQuestion(idx)}
              >
                🗑 Remove Question
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addQuestion}>
          ➕ Add New Question
        </button>

        <button type="submit" className="submit-btn">
          ✅ Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default AdminCreateQuiz;
