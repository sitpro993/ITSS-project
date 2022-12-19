const mongoose = require("mongoose");

// const availableTime = new mongoose.Schema({});

const studentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    age:{type: Number, default: 18},
    address: { type: String, default: ''},
    phone: {type: String, default: ""},
    CPA: { type: Number, required: true, default: 0 },
    availableTime: { type: String, default: ''},
    achievement: { type: String, default: '' },
    strength: { type: String, default: '' },
    weakness: { type: String , default: '' },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
    ]
  },
  {
    timestamps: true,
  }
);

let Students =
  mongoose.models.student || mongoose.model("student", studentSchema);
module.exports = Students;
