const express = require('express')
const Student = require('../models/studentModel.js')

const studentRouter = express.Router()

const dotenv = require('dotenv')
const auth = require('../auth.js')
dotenv.config()

studentRouter.get('/profile', async (req, res) => {
  try {
    const authResult = await auth(req, res)
    if (authResult.role != 'student' && authResult.role != 'company') {
      return res.status(403).send({ message: 'Bạn không có quyền' })
    }

    // console.log(req.params.id)

    const student = await Student.findOne({ userId: authResult.id }).populate('jobs')
    if (!student) {
      return res.status(404).send({ message: 'Không tìm thấy sinh viên' })
    }

    return res.json({
      msg: 'Success',
      data: student,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

studentRouter.put('/:id', async (req, res) => {
  try {
    const authResult = await auth(req, res)

    if (authResult.role != 'student' || authResult.id != req.params.id) {
      return res.status(403).send({ message: 'Bạn không có quyền' })
    }

    const student = await Student.findOneAndUpdate({ userId: req.params.id }, req.body, {
      new: true,
    })

    return res.json({
      msg: 'Success',
      data: student,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
})

module.exports = studentRouter
