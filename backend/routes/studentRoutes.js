const express = require("express")
const { applyToCompany, applyForInternship, selectPlan, paymentCallback, getAllInternships } = require("../controllers/studentController")
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()
//apply for company
router.post('/selectplan', protect, selectPlan);
router.get('/payment/callback', paymentCallback);
router.post("/apply", protect, applyToCompany);
// Apply for an internship
router.post('/internships/apply/:internshipId', protect, applyForInternship);
router.post('/internships', getAllInternships);


module.exports = router;