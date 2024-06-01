const express=require("express")

const { filterCompaniesByStatus, getAllCompanies, getCompanyById, approveCompanyApplication, rejectCompanyApplication} = require("../controllers/adminController")
const { protect, admin } = require("../middleware/authMiddleware")
const router=express.Router()

router.put("/company/application/:applicationId/approve",protect, admin, approveCompanyApplication)
router.put("/company/application/:applicationId/reject",protect, admin, rejectCompanyApplication)
router.get("/company/:status", filterCompaniesByStatus)
router.get("/company", getAllCompanies);
router.get("/companies/:companyId", getCompanyById);




module.exports = router;
