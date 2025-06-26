import React, { useState } from 'react';
import API from '../api';
import '../css/createquiz.css';

const AdminCreateQuiz = () => {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  }]);

  // … handleQuestionChange, addQuestion, removeQuestion …

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('quiz/add-quiz', { category, questions });
      alert('✅ Quiz added successfully!');
      setCategory('');
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
    } catch (err) {
      alert(err.response?.data?.message || '❌ Error adding quiz.');
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
