const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    field: {
      type: String,
      require: true,
    },
    salary: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    deadline: {
      type: Date,
      require: true,
    },
    benefit: {
      type: String,
      require: true,
    },
    required_skills: {
      type: [String],
      require: true,
    },
    required_employees: {
      type: Number,
      require: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      }
    ]
  },
  {
    timestamps: true,
  }
);

let Position =
  mongoose.models.position || mongoose.model("position", positionSchema);
module.exports = Position;
