const mongoose = require("mongoose");

const availableTime = new mongoose.Schema({});

const studentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    CPA: { type: Number, required: true, default: 0 },
    availableTime: { type: [availableTime] },
    achievement: { type: String },
    strength: { type: String },
    weekness: { type: String },
  },
  {
    timestamps: true,
  }
);

let Students =
  mongoose.models.student || mongoose.model("student", studentSchema);
module.exports = Students;
