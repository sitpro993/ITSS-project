const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    field: {
      type: String,
    },
    salary: {
      type: String,
    },
    type: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    benefit: {
      type: String,
    },
    required_skills: {
      type: [String],
    },
    required_employees: {
      type: Number,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);

let Position =
  mongoose.models.position || mongoose.model("position", positionSchema);
module.exports = Position;
