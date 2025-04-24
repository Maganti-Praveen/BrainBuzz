require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const AuthRoutes = require("./routes/userlogin");
const AdminAuthRoutes = require("./routes/adminlogin");
const QuizRoutes = require("./routes/quiz");
const ScoreRoutes = require("./routes/score");
const LeaderboardRoutes = require("./routes/leaderboards");
const ContactRoutes = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", AuthRoutes);
app.use("/api/auth/admin", AdminAuthRoutes);
app.use("/api/quiz", QuizRoutes);
app.use("/api/save-score", ScoreRoutes);
app.use("/api/leaderboard", LeaderboardRoutes);
app.use("/api/contact", ContactRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.post("/api/seed", async (req, res) => {
  const Quiz = require("./models/Quiz");
  try {
    await Quiz.deleteMany({});
    await Quiz.insertMany([
      {
        category: "WebDev",
        questions: [
          {
            text: "What does HTML stand for?",
            options: [
              { text: "Hyper Text Markup Language", isCorrect: true },
              { text: "Home Tool Markup Language", isCorrect: false },
              { text: "Hyperlinks Text Markup Language", isCorrect: false },
              { text: "Hyperlinking Text Markup Language", isCorrect: false }
            ]
          },
          {
            text: "Which CSS property controls the text size?",
            options: [
              { text: "font-size", isCorrect: true },
              { text: "text-size", isCorrect: false },
              { text: "font-style", isCorrect: false },
              { text: "text-style", isCorrect: false }
            ]
          }
        ]
      },
      {
        category: "Python",
        questions: [
          {
            text: "What keyword is used to define a function in Python?",
            options: [
              { text: "def", isCorrect: true },
              { text: "function", isCorrect: false },
              { text: "fun", isCorrect: false },
              { text: "define", isCorrect: false }
            ]
          },
          {
            text: "Which data type is immutable in Python?",
            options: [
              { text: "List", isCorrect: false },
              { text: "Tuple", isCorrect: true },
              { text: "Dictionary", isCorrect: false },
              { text: "Set", isCorrect: false }
            ]
          }
        ]
      },
      {
        category: "Science",
        questions: [
          {
            text: "What is the chemical symbol for water?",
            options: [
              { text: "H2O", isCorrect: true },
              { text: "O2", isCorrect: false },
              { text: "CO2", isCorrect: false },
              { text: "HO", isCorrect: false }
            ]
          },
          {
            text: "Which planet is known as the Red Planet?",
            options: [
              { text: "Mars", isCorrect: true },
              { text: "Venus", isCorrect: false },
              { text: "Jupiter", isCorrect: false },
              { text: "Saturn", isCorrect: false }
            ]
          }
        ]
      },
      {
        category: "Social",
        questions: [
          {
            text: "Who was the first Prime Minister of India?",
            options: [
              { text: "Jawaharlal Nehru", isCorrect: true },
              { text: "Mahatma Gandhi", isCorrect: false },
              { text: "Indira Gandhi", isCorrect: false },
              { text: "Rajendra Prasad", isCorrect: false }
            ]
          },
          {
            text: "Which river is considered the holiest in India?",
            options: [
              { text: "Ganga", isCorrect: true },
              { text: "Yamuna", isCorrect: false },
              { text: "Godavari", isCorrect: false },
              { text: "Narmada", isCorrect: false }
            ]
          }
        ]
      },
      {
        category: "GK",
        questions: [
          {
            text: "What is the capital of France?",
            options: [
              { text: "Paris", isCorrect: true },
              { text: "Berlin", isCorrect: false },
              { text: "Madrid", isCorrect: false },
              { text: "Rome", isCorrect: false }
            ]
          },
          {
            text: "Which is the largest ocean on Earth?",
            options: [
              { text: "Pacific Ocean", isCorrect: true },
              { text: "Atlantic Ocean", isCorrect: false },
              { text: "Indian Ocean", isCorrect: false },
              { text: "Arctic Ocean", isCorrect: false }
            ]
          }
        ]
      },
      {
        category: "Funny",
        questions: [
          {
            text: "Which animal is often referred to as the 'King of the Jungle'?",
            options: [
              { text: "Lion", isCorrect: true },
              { text: "Tiger", isCorrect: false },
              { text: "Elephant", isCorrect: false },
              { text: "Giraffe", isCorrect: false }
            ]
          },
          {
            text: "Which fruit is humorously known as the 'King of Fruits' in some regions?",
            options: [
              { text: "Mango", isCorrect: true },
              { text: "Apple", isCorrect: false },
              { text: "Banana", isCorrect: false },
              { text: "Orange", isCorrect: false }
            ]
          }
        ]
      },
      {
        category: "Political",
        questions: [
          {
            text: "Who was responsible for developing Cyberabad and transforming Hyderabad into an IT hub?",
            options: [
              { text: "YS Jagan Mohan Reddy", isCorrect: false },
              { text: "Nara Chandrababu Naidu", isCorrect: true },
              { text: "K Rosaiah", isCorrect: false },
              { text: "KCR", isCorrect: false }
            ]
          },
          {
            text: "Which TDP leader played a key role in bringing companies like Microsoft, Google, and Facebook to Hyderabad?",
            options: [
              { text: "ktr", isCorrect: false },
              { text: " Pawan Kalyan ", isCorrect: false },
              { text: "Nara Chandrababu Naidu", isCorrect: true },
              { text: "Jagan Mohan Reddy", isCorrect: false }
            ]
          },
          {
            text: "Who was the Cheif Minister of Andhra Pradesh?",
            options: [
              { text: "Nara Chandrababu Naidu", isCorrect: true },
              { text: "YS Jagan Mohan Reddy", isCorrect: false },
              { text: " Nara Lokesh", isCorrect: false },
              { text: "Pawan Kalyan", isCorrect: false }
            ]
          },
          {
            text: "Who was Deputy CM of Andhra Pradesh",
            options: [
              { text: "Nara Chandrababu Naidu", isCorrect: false },
              { text: "Pawan Kalyan", isCorrect: true },
              { text: "YS Jagan", isCorrect: false },
              { text: "Nara Lokesh", isCorrect: false }
            ]
          },
          {
            text: "Who was the IT and Education Minister of Andhra Pradesh?",
            options: [
              { text: "Nara Chandrababu Naidu", isCorrect: false },
              { text: "YS Jagan Mohan Reddy", isCorrect: false },
              { text: " Nara Lokesh", isCorrect: true },
              { text: "Pawan Kalyan", isCorrect: false }
            ]
          },
          {
            text: "Who was the MLA of Denduluru Consistency?",
            options: [
              { text: "Chintamaneni Prabhaker 🦁", isCorrect: true },
              { text: "Kotaru Abbay Chowdary 🐐", isCorrect: false },
              { text: "Paradha Saradhi", isCorrect: false },
              { text: "Putta Mahesh yadav", isCorrect: false }
            ]
          },
          {
            text: "Who was the Best MP in Andhra Pradesh?",
            options: [
              { text: "Kinjarapu Ram Mohan naidu", isCorrect: true },
              { text: "Putta Mahesh Yadav", isCorrect: false },
              { text: "Kotagiri Sridhar", isCorrect: false },
              { text: "Raghu Rama Krishna Raju", isCorrect: false }
            ]
          }
        ]
      }
    ]);
    res.json({ message: "Data seeded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Server is running on port ${PORT}`)
);
