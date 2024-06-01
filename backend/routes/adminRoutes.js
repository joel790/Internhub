const express = require("express")

const {
    filterCompaniesByStatus,
    getAllCompanies,
    getCompanyById,
    approveCompanyApplication,
    rejectCompanyApplication
} = require("../controllers/adminController")
const { protect, admin } = require("../middleware/authMiddleware")
const router = express.Router()

router.put("/company/application/:applicationId/approve", protect, admin, approveCompanyApplication)
router.put("/company/application/:applicationId/reject", protect, admin, rejectCompanyApplication)
router.get('/companies/status/:status', protect, admin, filterCompaniesByStatus);
router.get('/companies', protect, getAllCompanies);
router.get('/companies/:companyId', protect, getCompanyById);

module.exports = router;
