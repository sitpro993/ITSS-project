const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    request: {
      type: String,
    },
    working_type: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "Submitted"
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

let Job = mongoose.models.job || mongoose.model("job", jobSchema);
module.exports = Job;