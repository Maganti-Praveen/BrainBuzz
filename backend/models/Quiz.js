const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  category: String,
  questions: [
    {
      text: String,
      options: [{ text: String, isCorrect: Boolean }],
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
