const mongoose = require('mongoose')

const commonJobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    video_link: {
      type: String,
    },
    image: {
      type: String,
    },
    skills: {
        type: String
    },
    salary: {
      type: String,
    },
    post: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

let commonJob = mongoose.models.commonJob || mongoose.model('commonJob', commonJobSchema)
module.exports = commonJob
