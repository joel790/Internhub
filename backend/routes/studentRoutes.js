const express = require("express")
const studentController = require("../controllers/studentController")
const { protect } = require('../middleware/authMiddleware');
const upload = require("../middleware/multer");
const router = express.Router()
//apply for company
router.post('/selectplan', protect, studentController.selectPlan);
router.get('/transaction', studentController.TransactionPay);
// router.get('/payment/callback', studentController.paymentCallback);
router.post('/:planId/apply', protect, upload.fields([
  { name: 'license', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), studentController.applyToCompany);
// router.post("/apply", protect, studentController.applyToCompany);
// Apply for an internship
router.post('/internships/:internshipId/apply',upload.single('resume'), protect,studentController.applyForInternship);
router.get('/internships', studentController.getAllInternships);
router.get('/applications', protect, studentController.getApplications);
module.exports = router;