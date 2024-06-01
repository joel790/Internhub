const express = require("express")
const { applyToCompany, applyForInternship } = require("../controllers/studentController")
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()
//apply for company
router.post("/apply", protect, applyToCompany);
// Apply for an internship
router.post('/internships/apply/:internshipId', protect, applyForInternship);


module.exports = router;