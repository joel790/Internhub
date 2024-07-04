const express = require("express")
const studentController = require("../controllers/studentController")
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()
//apply for company
router.post('/selectplan', protect, studentController.selectPlan);
router.get('/payment/callback', studentController.paymentCallback);
router.post("/:planId/apply-to-company", protect, studentController.applyToCompany);
// Apply for an internship
router.post('/internships/apply/:internshipId', protect, studentController.applyForInternship);
router.get('/internships', studentController.getAllInternships);
module.exports = router;