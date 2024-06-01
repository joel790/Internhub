const express = require("express");
const {
    createInternship,
    deleteInternship,
    updateInternship,
    rejectApplication,
    approveApplication,
    getAllInternshipsByCompany } = require("../controllers/companyController");
const { protect, company } = require("../middleware/authMiddleware")
const router = express.Router();

// Routes for company to manage internships
router.post('/internship', protect, company, createInternship);
router.put('/internship/:internshipId', protect, company, updateInternship);
router.delete('/internship/:internshipId', protect, company, deleteInternship);
router.get('/internship/company', protect, company, getAllInternshipsByCompany);
// Approve or reject an application (only for companies) 
router.put('/applications/:applicationId/approve', protect, company, approveApplication);
router.put('/applications/:applicationId/reject', protect, company, rejectApplication);

module.exports = router;

