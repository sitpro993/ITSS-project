const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
  {
    name: {
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
    benefit: {
      type: String,
      require: true,
    },
    required_skills: {
      type: String,
      require: true,
    },
    working_form: {
      type: String,
    },
    internship_time:{
      type: String,
    },
    required_employees: {
      type: Number,
      require: true,
      default: 9999,
    },
    description:{
      type: String
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
