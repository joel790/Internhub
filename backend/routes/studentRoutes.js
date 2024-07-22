const express = require("express");
const studentController = require("../controllers/studentController");
const upload = require("../middleware/multer")
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.post('/selectplan', protect, studentController.selectPlan);
router.get('/payment/callback', studentController.paymentCallback);
router.post("/:planId/apply", protect, upload.fields([
  { name: 'license', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), studentController.applyToCompany);
router.post('/internships/:internshipId/apply', protect, upload.single('resume'), studentController.applyForInternship);
router.get('/internships', studentController.getAllInternships);
router.get('/applications', protect, studentController.getApplications);
router.get('/transactions', protect, studentController.TransactionPay);

module.exports = router;