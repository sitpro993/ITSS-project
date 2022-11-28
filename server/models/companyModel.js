const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
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
    },
    created_time: {
      type: Number,
      require: true,
    },
    field: {
      type: String,
      require: true,
    },
    number_of_employee:{
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    position: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position"
    }]
  },
  {
    timestamps: true,
  }
);

let Company = mongoose.models.company || mongoose.model("company", companySchema);
module.exports = Company;
