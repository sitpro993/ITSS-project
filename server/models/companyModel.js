const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    short_name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      require: true,
      default: "",
    },
    created_time: {
      type: Number,
      require: true,
      default: "",
    },
    field: {
      type: String,
      require: true,
      default: "",
    },
    number_of_employee: {
      type: Number,
      require: true,
      default: 0,
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    positions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "position",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Company =
  mongoose.models.company || mongoose.model("company", companySchema);
module.exports = Company;
