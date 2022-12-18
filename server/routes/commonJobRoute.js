const express = require('express')
const commonJob = require('../models/commonJobModel.js')

const commonJobRouter = express.Router()

const dotenv = require('dotenv')
const auth = require('../auth.js')
dotenv.config()


commonJobRouter.get('/', async (req, res) => {
  try {
    const result = await commonJob.find()
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

commonJobRouter.get('/:id', async (req, res) => {
  try {
    const result = await commonJob.findOne({ _id: req.params.id })
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

commonJobRouter.post('/', async (req, res) => {
  try {
    const authResult = await auth(req, res)
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
    const authResult = await auth(req, res)
    // if (authResult.role != 'admin') {
    //   return res.status(403).send({ message: 'Bạn không có quyền' })
    // }

    const deletedJob = await commonJob.findOneAndDelete({_id: req.params.id})
    if (deletedJob)
      return res.json({success: 'Delete success'})
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

module.exports = commonJobRouter
