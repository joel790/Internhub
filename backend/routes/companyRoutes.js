const express = require("express");
const companyController = require("../controllers/companyController");
const { protect, company } = require("../middleware/authMiddleware")
const router = express.Router();

// Routes for company to manage internships
router.post('/internship', protect, company, companyController.createInternship);
router.get('/internship/featured', companyController.featuredInternships);
router.put('/internship/:internshipId', protect, company, companyController.updateInternship);
router.delete('/internship/:internshipId', protect, company, companyController.deleteInternship);
router.get('/internship/my-internship', protect, company, companyController.getAllInternshipsByCompany);
router.get('/companyinternship/:companyId', companyController.getAllInternshipsOfCompany);
router.get('/internships/:id', companyController.getInternshipsById);
router.get('/internship/:internshipId/applications', protect, company, companyController.getApplicationsForInternship);
router.put('/application/:applicationId/status', protect, company, companyController.updateApplicationStatus);
router.get("/application/:id",protect,company,companyController.getapplicationsforInternshipByappid);
router.get("/student/:id",protect,company,companyController.getStudentbyId)


module.exports = router;
