const express = require("express")
const adminController = require("../controllers/adminController")

const { protect, admin } = require("../middleware/authMiddleware")
const router = express.Router()
router.put("/company/application/:applicationId/approve", protect, admin,adminController.approveCompanyApplication)
router.put("/company/application/:applicationId/reject", protect, admin, adminController.rejectCompanyApplication)
router.get('/companies/status/:status', protect, admin, adminController.filterCompaniesByStatus);
router.get('/applications', adminController.getAllApplications);
router.get('/companies', adminController.getAllCompanies);
router.get('/companies/:companyId', adminController.getCompanyById);
// Route to create, update and get  a plan
router.post('/plans', protect, admin, adminController.createPlan);
router.put('/plans/:planId', protect, admin, adminController.updatePlan);
router.get('/plans', protect, adminController.getAllPlans);

module.exports = router;
