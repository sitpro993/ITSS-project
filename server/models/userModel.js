const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default:
        "https://res.cloudinary.com/beeyou/image/upload/v1641721299/logo/avatar7_jkzd2h.png",
    },

    phone: { type: String, default: "" },
    address: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

let Users = mongoose.models.user || mongoose.model("user", userSchema);
module.exports = Users;
