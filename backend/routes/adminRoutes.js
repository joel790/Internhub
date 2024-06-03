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
router.get('/companies', protect, getAllCompanies);
router.get('/companies/:companyId', protect, getCompanyById);
//planes
// Route to create a plan
router.post('/plans',protect, admin, createPlan);

// Route to update a plan
router.put('/plans/:planId',protect, admin, updatePlan);

// Route to get all plans
router.get('/plans', protect, getAllPlans);

module.exports = router;
