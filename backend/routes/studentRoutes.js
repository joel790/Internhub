const express=require("express")
const { applyInternship } = require("../controllers/studentController")
const { protect } = require('../middleware/authMiddleware');

const router= express.Router()
// Apply for an internship
router.post('/internships/:internshipId/apply', protect, applyInternship);


module.exports=router;