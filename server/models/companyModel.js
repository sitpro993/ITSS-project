const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
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
    address: {
      type: String,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
    company_type: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    number_intern:{
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);

let Company = mongoose.models.company || mongoose.model("company", companySchema);
module.exports = Company;
