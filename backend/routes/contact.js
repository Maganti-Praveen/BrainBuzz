const express = require("express");
const router = express.Router();

// Simple contact endpoint
router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact message received:", { name, email, message });
  res.json({ message: "Thank you for contacting us. We will get back to you soon." });
});

module.exports = router;
