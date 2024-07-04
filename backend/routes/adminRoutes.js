const express = require("express")

const {
    filterCompaniesByStatus,
    getAllCompanies,
    getCompanyById,
    approveCompanyApplication,
    rejectCompanyApplication,
    createPlan,
    updatePlan,
    getAllPlans
} = require("../controllers/adminController")
const { protect, admin } = require("../middleware/authMiddleware")
const router = express.Router()

router.put("/company/application/:applicationId/approve", protect, admin, approveCompanyApplication)
router.put("/company/application/:applicationId/reject", protect, admin, rejectCompanyApplication)
router.get('/companies/status/:status', protect, admin, filterCompaniesByStatus);
router.get('/companies', getAllCompanies);
router.get('/companies/:companyId', getCompanyById);
// Route to create, update and get  a plan
router.post('/plans', protect, admin, createPlan);
router.put('/plans/:planId', protect, admin, updatePlan);
router.get('/plans', protect, getAllPlans);

module.exports = router;
