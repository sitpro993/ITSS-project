const express = require("express")
const Company = require("../models/companyModel.js")
const auth = require("../auth.js")

const companyRouter = express.Router()

const dotenv = require("dotenv")
dotenv.config()

const userAcessToken = process.env.USER_ACCESS_TOKEN_SECRET;
const userRefreshToken = process.env.USER_REFRESH_TOKEN_SECRET;

// api/company
companyRouter.get("", async (req, res) => {
  try {
    const authResutl = await auth(req, res);

    const company = await Company.find()
    res.json({
      data: company,
    });
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
});

// api/company
companyRouter.post("", async (req, res) => {
  try {
    const authResutl = await auth(req, res);

    const {name, full_name, website, address, year, company_type, email, image, number_intern, description, status} = req.body
    const company = await Company.findOne({ email })
    if (company) return res.status(400).json({ err: "Email đã tồn tại." });

    const newCompany = new Company({
      name,
      full_name,
      website,
      address,
      year,
      company_type,
      email,
      image,
      number_intern,
      description, 
      status,
    })
    await newCompany.save();
    res.json({
      msg: "Đăng ký thành công", 
    });
  } catch (error) {
    return res.status(500).json({err: error.message});
  }
})

// api/company/:id
companyRouter.get("/:id", async (req, res) => {
  try {
    const authResutl = await auth(req, res);
    const { id } = req.params
    const company = await Company.findById(id)
    if (!company) return res.status(400).json({err: "Company does not exist,"});

    res.json({
      data: company,
    })
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

module.exports = companyRouter