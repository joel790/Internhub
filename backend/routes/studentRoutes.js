const express=require("express")
const { applyInternship, applyToCompany } = require("../controllers/studentController")
const { protect } = require('../middleware/authMiddleware');

const router= express.Router()
//apply for company
router.post("/apply", protect, applyToCompany);
// Apply for an internship
router.post('/internships/:internshipId/apply', protect, applyInternship);


module.exports=router;