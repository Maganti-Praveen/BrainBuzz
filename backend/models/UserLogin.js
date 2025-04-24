const mongoose = require("mongoose");

const UserLoginSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("UserLogin", UserLoginSchema);
