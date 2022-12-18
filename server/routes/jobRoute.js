const express = require("express")
const Job = require("../models/jobModel.js")
const Position = require("../models/positionModel.js")
const Student = require("../models/studentModel.js")
const Company = require("../models/companyModel.js")

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

    result.data = await Job.find({student: studentID}).populate({
      path: 'position',
      model: Position,
      populate: {
        path: 'company',
        model: Company
      },
    })
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

// api/job/:id
jobRouter.get("/:id", async (req, res) => {
  try {
    const authResult = await auth(req, res);
    const { id } = req.params

    const studentID = await Student.findOne({userId: authResult.id}).select('_id')

    const job = await Job.findById(id).populate({
      path: 'position',
      model: Position,
      populate: {
        path: 'company',
        model: Company
      },
    }).populate({
      path: "student",
      model: Student
    })
    if (!job) return res.status(400).json({err: "job does not exist"});
    const position = await Position.findById(job.position)
    if (!position) return res.status(400).json({err: "job info have wrong position"});

    if (!studentID.equals(job.student) && !position.company.equals(job.company)) {
      return res.status(403).send({message: "Bạn không có quyền"});
    }

    res.json({
      data: job,
    })
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

// api/job/registerJob
jobRouter.post('/registerJob', async (req, res) => {
  try {
    const data = req.body
    const job = new Job(data)
    const result =  await job.save()

    if(result){
      const position = await Position.findOneAndUpdate({_id: result.position},{$push: {jobs: result._id}})
      res.status(200).json({msg: "apply successfully!"})
    }
    
  }catch (error) {
    return res.status(500).json({err: error.message});
  }
})

jobRouter.post('/deny', async(req, res) =>{
  try {
    const id = req.body.id;
    const data = await Job.findByIdAndUpdate(id,{status: 'deny'} , {new: true});
    if(data){
    return res.status(200).json({msg: "Deny"})
    }
  } catch (error) {
    return res.status(500).json({err: error.message});
    
  }
})

// api/job/:id/accept
jobRouter.post("/accept", async (req, res) => {
  try {
    
    const id = req.body.id;
    console.log(id)
    const data = await Job.findOneAndUpdate({_id: id}, {status: 'accepted'}, {new: true});
;
    console.log(data)
    if(data){
    return res.status(200).json({msg: "Accepted"})
    }
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

module.exports = jobRouter