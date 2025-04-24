const express = require("express");
const UserLogin = require("../models/UserLogin");

const router = express.Router();

// Save or accumulate score
router.post("/", async (req, res) => {
  try {
    const { email, score } = req.body;
    const user = await UserLogin.findOne({ email });
    console.log("📩 Received score data:", req.body);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.score = (user.score || 0) + score;
    await user.save();
    res.json({ message: "Score updated", score: user.score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
