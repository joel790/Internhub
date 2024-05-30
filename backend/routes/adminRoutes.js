const express=require("express")

const {approveCompany} = require("../controllers/adminController")
const router=express.Router()

router.put("/approve/:companyId", approveCompany)

module.exports = router;
