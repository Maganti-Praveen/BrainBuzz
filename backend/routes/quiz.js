const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

// ✅ Static route should be placed first
router.get("/categories", async (req, res) => {
  try {
    const categories = await Quiz.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const categoryParam = req.params.category.trim(); // Sanitize
    const quizzes = await Quiz.find({
      category: { $regex: new RegExp(`^${categoryParam}$`, "i") }, // Case-insensitive
    });

    if (!quizzes.length) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    const questions = quizzes.flatMap((quiz) => quiz.questions);
    res.json(questions);
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    res.status(500).json({ error: err.message });
  }
});


// Add a new quiz or append questions
router.post("/add-quiz", async (req, res) => {
  try {
    const { category, questions } = req.body;

    if (!category || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Invalid quiz data" });
    }

    const formattedQuestions = questions.map(q => ({
      text: q.question,
      options: q.options.map(opt => ({
        text: opt,
        isCorrect: opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      }))
    }));

    let existingQuiz = await Quiz.findOne({ category });

    if (existingQuiz) {
      existingQuiz.questions.push(...formattedQuestions);
      await existingQuiz.save();
    } else {
      await Quiz.create({ category, questions: formattedQuestions });
    }

    res.status(201).json({ message: "✅ Quiz saved successfully" });
  } catch (err) {
    console.error("❌ Error saving quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
