const express = require("express");
const UserLogin = require("../models/UserLogin");

const router = express.Router();

// Return top scorers
router.get("/", async (req, res) => {
  try {
    const leaderboard = await UserLogin.find()
      .sort({ score: -1 })
      .select("name score -_id");
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
