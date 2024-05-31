const express = require("express");
const { applyToCompany, getAllInternshipsBycompany, createInternship, deleteInternship, updateInternship, rejectApplication, approveApplication } = require("../controllers/companyController");
const {protect, company}=require("../middleware/authMiddleware")
const router = express.Router();


//apply for company
router.post("/apply",protect, applyToCompany);
// Route to create an internship
router.post('/internship', protect, company, createInternship);

// Route to update an internship
router.put('/internship/:internshipId', protect, company, updateInternship);

// Route to delete an internship
router.delete('/internship/:internshipId', protect, company, deleteInternship);

// Route to get all internships for a company
router.get('/internship', protect, company, getAllInternshipsBycompany);
// Approve an application (only for companies)
router.put('/applications/:applicationId/approve', protect, company, approveApplication);

// Reject an application (only for companies)
router.put('/applications/:applicationId/reject', protect, company, rejectApplication);

module.exports = router;

