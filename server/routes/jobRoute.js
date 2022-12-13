const express = require("express")
const Job = require("../models/jobModel.js")
const Position = require("../models/positionModel.js")
const Student = require("../models/studentModel.js")

const jobRouter = express.Router()

const dotenv = require("dotenv")
const auth = require("../auth.js")
dotenv.config()

// api/job
jobRouter.get("", async (req, res) => {
  try {
    const authResult = await auth(req, res);
    if (authResult.role != "student") {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const studentID = await Student.findOne({userID: authResult.ID}).select('_id')
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalJobs = await Job.countDocuments({student: studentID}).exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalJobs = totalJobs
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Job.countDocuments({student: studentID}).exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }

    result.data = await Job.find({student: studentID})
    .skip(startIndex)
    .limit(limit)
    .exec()

    result.rowsPerPage = limit
    return res.json({
      msg: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

// api/job/:id/accept
jobRouter.post("/accept", async (req, res) => {
  try {
    const authResult = await auth(req, res);
    console.log()
    const { id } = req.params
    const job = await Job.findById(id)
    if (!job) {
      res.status(403).send({message: "Bạn không có quyền"});
    }
    const position = await Position.findById(job['position'])
    if (authResult.role != "company" || authResult.id != position.company.ToString()){
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const updateJob = await Job.findByIdAndUpdate(
      id,
      {
        status: "accepted",
      },
      {
        new: true,
      }
    )
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

module.exports = jobRouter