const express = require("express");
const {
    createInternship,
    deleteInternship,
    updateInternship,
    getAllInternshipsByCompany, 
    getApplicationsForInternship,
    updateApplicationStatus,
    getAllInternships,
    getInternshipsById,
    getFeaturedInternships} = require("../controllers/companyController");
const { protect, company } = require("../middleware/authMiddleware")
const router = express.Router();

// Routes for company to manage internships
router.post('/internship', protect, company, createInternship);
router.put('/internship/:internshipId', protect, company, updateInternship);
router.delete('/internship/:internshipId', protect, company, deleteInternship);
router.get('/internship/company', protect, company, getAllInternshipsByCompany);
router.get('/internships', getAllInternships);
router.get('/internships/:id', getInternshipsById);
router.get('/internships/featured', getFeaturedInternships);
// Approve or reject an application (only for companies) 
router.get('/internship/:internshipId/applications',protect, company, getApplicationsForInternship);
router.put('/application/:applicationId/status', protect, company, updateApplicationStatus);


module.exports = router;

