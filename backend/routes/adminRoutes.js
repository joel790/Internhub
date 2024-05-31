const express=require("express")

const {approveCompany, filterCompaniesByStatus, getAllCompanies, getCompanyById} = require("../controllers/adminController")
const router=express.Router()

router.put("/company/approve/:companyId", approveCompany)
router.get("/company/:status", filterCompaniesByStatus)
router.get("/company", getAllCompanies);
router.get("/companies/:companyId", getCompanyById);



module.exports = router;
