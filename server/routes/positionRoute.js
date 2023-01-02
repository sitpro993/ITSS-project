const express = require("express")
const Position = require("../models/positionModel.js")
const Job = require("../models/jobModel.js")
const Student = require("../models/studentModel.js")
const Company = require("../models/companyModel.js")
const auth = require("../auth.js")

const positionRouter = express.Router()

const dotenv = require("dotenv")
dotenv.config()

const userAcessToken = process.env.ACCESS_TOKEN_SECRET;

// api/position
positionRouter.get("", async (req, res) => {
  try {
    // need login to see job
    const authResutl = await auth(req, res);

    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalPositions = await Position.countDocuments().exec(); 
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPositions = totalPositions;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Position.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }

    result.data = await Position.find()
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

// api/position/:id
positionRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const position = await Position.findById(id)
    if (!position) return res.status(400).json({err: "position does not exist,"});

    res.json({
      data: position,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/position/:id/apply
positionRouter.post("/:id/apply", async(req, res) => {
  try {
    // check student login
    const authResult = await auth(req, res);
    if (authResult.role != "student") {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const { id } = req.params
    const { request, working_type } = req.body
    const checkApplied = await Job.findOne({student: authResult.id})
    if (checkApplied) return res.status(400).json({err: "Đã đăng ký vị trí này"});

    const studentID = await Student.findOne({userId: authResult.id}).select('_id')

    const newJob = new Job({
      request,
      working_type,
      position: id,
      student: studentID,
    })
    await newJob.save()
    await Student.findOneAndUpdate(
      {userId: authResult.id},
      { $push: { jobs: newJob._id }}
    )
    await Position.findOneAndUpdate(
      {user_id: authResult.id},
      { $push: {jobs: newJob._id }}
    )
    res.json({
      msg: "Đăng ký vị trí mới thành công",
    })
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

// api/position/:id/applied
// to display student applied job
positionRouter.get("/:id/applied", async (req, res) => {
  try {
    // need login to see job
    const authResult = await auth(req, res);
    if (authResult.role != "company") {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const { id } = req.params

    const company = await Company.findOne({user_id: authResult.id})
    const position = await Position.findById(id).populate({
      path: 'jobs', 
      model: Job,
      populate: {
        path: 'student',
        model: Student
      },
    })

    const job = await Job.find({ position: position._id })
    if (!company._id.equals(position.company)) {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    if (!position) return res.status(400).json({err: "position does not exist"});

    res.json({
      data: job,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

positionRouter.post('/registerJob', async(req, res) => {
  try {
    const data = req.body
    const position = new Position(data);
  const result = await position.save();
    if(result) {
      const test = await Company.findOneAndUpdate({_id: result.company}, { $push: { positions: result._id } })  
      res.status(200).json({msg: 'Đăng ký công việc thành công'})
    }
  }  catch (error) {
    return res.status(500).json({ err: error.message });
  }
})


positionRouter.get("/getByCompany/:id", async (req, res) => {
  try {
    // need login to see job
    const companyId = req.params.id
    const position = await Position.find({company: companyId})

    
    res.json({
      data: position,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});





module.exports = positionRouter