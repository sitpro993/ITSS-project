const express = require('express')
const commonJob = require('../models/commonJobModel.js')
const Position = require("../models/positionModel.js")
const commonJobRouter = express.Router()

const dotenv = require('dotenv')
const auth = require('../auth.js')
dotenv.config()

const SORTBY = {
  CREATEDAT: 1,
  MOSTVIEWED: 2,
  MOSTAPPLIED: 3,
}

commonJobRouter.get('/', async (req, res) => {
  try {
    const searchKey = req.query.searchKey || "";
    const sortBy = req.query.sortBy || SORTBY.CREATEDAT;

    let result = null;

    if (sortBy == SORTBY.CREATEDAT) {
      result = await commonJob.find({title: {$regex: searchKey, $options: 'i'}}).sort({createdAt: -1})
    } else if (sortBy == SORTBY.MOSTVIEWED) {
      result = await commonJob.find({title: {$regex: searchKey, $options: 'i'}}).sort({viewed: -1})
    }

    if (!result) {
      return res.status(404).send({ message: 'Không tìm thấy công việc' })
    }
    return res.json({
      msg: 'Success',
      data: result,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

commonJobRouter.get('/list', async (req, res) => {
  try {
    const commonJobs = await commonJob.find()
    if (!commonJobs) {
      return res.status(404).send({ message: 'Không tìm thấy công việc thông thường' })
    }

    const positions = await Position.find().select('jobs name')

    var result = commonJobs.map(function(commonjob) {
      var tempJob = commonjob.toObject();
      tempJob.count = 0

      for (var i = 0; i < positions.length; i++) {
        if (positions[i].name == commonjob.title && typeof(positions[i].jobs) != 'undefined') {
          tempJob.count += positions[i].jobs.length
        }
      }
      return tempJob
    })

    result.sort((a, b) => (a.count < b.count) ? 1 : -1)

    return res.json({
      msg: 'Success',
      data: result,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

commonJobRouter.get('/:id', async (req, res) => {
  try {
    const result = await commonJob.findOne({ _id: req.params.id })

    if (!result) {
      return res.status(404).send({ message: 'Không tìm thấy công việc' })
    }
    
    // update viewed
    await commonJob.updateOne({ _id: req.params.id }, { $inc: { viewed: 1 } })

    return res.json({
      msg: 'Success',
      data: result,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

commonJobRouter.post('/', async (req, res) => {
  try {
    // const authResult = await auth(req, res)
    // if (authResult.role != 'admin') {
    //   return res.status(403).send({ message: 'Bạn không có quyền' })
    // }

    const newCommonJob = await commonJob.create(req.body)
    return res.json({
      msg: 'Success',
      data: newCommonJob,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

commonJobRouter.delete('/:id', async (req, res) => {
  try {
    // const authResult = await auth(req, res)
    // if (authResult.role != 'admin') {
    //   return res.status(403).send({ message: 'Bạn không có quyền' })
    // }

    const deletedJob = await commonJob.findOneAndDelete({_id: req.params.id})
    if (deletedJob)
      return res.json({success: 'Delete success'})
    else return res.status(404).json({success: false, message: "Cannot find this occupation"})
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

module.exports = commonJobRouter
