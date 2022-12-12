const express = require("express")
const Company = require("../models/companyModel.js")
const Position = require("../models/positionModel.js")
const Job = require("../models/jobModel.js")
const Student = require("../models/studentModel.js")
const auth = require("../auth.js")

const companyRouter = express.Router()

const dotenv = require("dotenv")
dotenv.config()

const userAcessToken = process.env.ACCESS_TOKEN_SECRET;

// api/company
companyRouter.get("", async (req, res) => {
  try {
    const authResutl = await auth(req, res);

    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalCompanys = await Company.countDocuments().exec(); 
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalCompanys = totalCompanys;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Company.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }


    result.data = await Company.find()
      .skip(startIndex)
      .limit(limit)
      .exec()
    
    result.data.forEach(v => { v['positions'] = [] });

    result.rowsPerPage = limit
    return res.json({
      msg: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
});

// api/company
// companyRouter.post("", async (req, res) => {
//   try {
//     const authResutl = await auth(req, res);

//     const {name, full_name, website, address, year, company_type, email, image, number_intern, description, status} = req.body
//     const company = await Company.findOne({ email })
//     if (company) return res.status(400).json({ err: "Email đã tồn tại." });

//     const newCompany = new Company({
//       name,
//       full_name,
//       website,
//       address,
//       year,
//       company_type,
//       email,
//       image,
//       number_intern,
//       description, 
//       status,
//     })
//     await newCompany.save();
//     res.json({
//       msg: "Đăng ký thành công", 
//     });
//   } catch (error) {
//     return res.status(500).json({err: error.message});
//   }
// })

// api/company/allApplications
companyRouter.get("/applications/all", async (req,res) =>{
  try {
    // need login to see job
    const authResult = await auth(req, res);
    if (authResult.role != "company") {
      res.status(403).send({message: "Bạn không có quyền"});
    }
    // const { id } = req.params

    const company = await Company.findOne({user_id: authResult.id})
    const positionList = company.positions
    let positions = []
    for (let positionID of positionList){
      console.log(positionID)
      let position = await Position.findById(positionID).populate({
        path: 'jobs', 
        model: Job,
        populate: {
          path: 'student',
          model: Student
        },
      }
        )
      if (!company._id.equals(position.company)) {
        res.status(403).send({message: "Bạn không có quyền"});
      }
      if (!position) return res.status(400).json({err: "position does not exist"});

      positions.push(position)
    }
      
    res.json({
      data: positions,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
})


// api/company/:id
companyRouter.get("/:id", async (req, res) => {
  try {
    const authResutl = await auth(req, res);
    const { id } = req.params
    const company = await Company.findById(id)
    if (!company) return res.status(400).json({err: "Company does not exist."});

    if (authResutl != "company" && authResutl.id != company.user_id) {
      company.forEach(v => { v['positions'] = [] })
    }
    res.json({
      data: company,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/company/:id/position
companyRouter.post("/:id/position", async (req, res) => {
  try {
    const authResult = await auth(req, res)
    if (authResult.role != "company") {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const {id} = req.params
    const company = await Company.findById(id)
    if (!company) return res.status(400).json({err: "Company does not exist."});
    if (company.user_id != authResult.id) {
      return res.status(403).send({message: "Bạn không có quyền"});
    }

    const {name, field, salary, type, deadline, benefit, required_skills, required_employees} = req.body
    const position = await Position.findOne({ name: name, company: id})
    if (position) return res.status(400).json({ err: "Công việc đã tồn tại." });

    const newPosition = new Position({
      name,
      field,
      salary,
      type,
      deadline,
      benefit,
      required_skills,
      required_employees,
      company: company._id,
    })
    await newPosition.save();
    await Company.findByIdAndUpdate(
      id,
      { $push: { positions: newPosition._id }}
    )
    res.json({
      msg: "Đăng ký công việc mới thành công",
    })
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

// api/company/:com_id/position/:pos_id
companyRouter.put("/:com_id/position/:pos_id", async (req, res) => {
  try {
    const authResult = await auth(req, res)
    if (authResult.role != "company") {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const {com_id, pos_id} = req.params
    const company = await Company.findById(com_id)
    if (!company) return res.status(400).json({err: "Company does not exist."});
    if (company.user_id != authResult.id) {
      return res.status(403).send({message: "Bạn không có quyền"});
    }

    const {name, field, salary, type, deadline, benefit, required_skills, required_employees} = req.body
    const position = await Position.findByIdAndUpdate(
      pos_id,
      {
        name,
        field,
        salary,
        type,
        deadline,
        benefit,
        required_skills,
        required_employees,
      },
      {
        new: true,
      }
    );
    res.json({
      msg: "Chỉnh sửa thành công",
      position: {
        position
      }
    })
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

// api/company/:com_id/position/:pos_id
companyRouter.delete("/:com_id/position/:pos_id", async (req, res) => {
  try {
    const authResult = await auth(req, res)
    if (authResult.role != "company") {
      return res.status(403).send({message: "Bạn không có quyền"});
    }
    const {com_id, pos_id} = req.params
    const company = await Company.findById(com_id)
    if (!company) return res.status(400).json({err: "Company does not exist."});
    if (company.user_id != authResult.id) {
      return res.status(403).send({message: "Bạn không có quyền"});
    }

    const {name, field, salary, type, deadline, benefit, required_skills, required_employees} = req.body
    const position = await Position.findByIdAndDelete(pos_id)
    res.json({
      msg: "Xoá thành công",
      position: {
        position
      }
    })
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})




module.exports = companyRouter