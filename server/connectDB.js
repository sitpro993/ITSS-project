const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure:", error.message);
  }
}

module.exports = { connectDB };
