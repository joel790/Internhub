const express = require("express");
const studentController = require("../controllers/studentController");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Use relative path without leading slash
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const uploads = multer({ storage: storage });

// Middleware to handle multiple file uploads
const uploadFiles = uploads.fields([
    { name: 'license', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
]);

// Routes
router.post('/selectplan', protect, studentController.selectPlan);
router.get('/payment/callback', studentController.paymentCallback);
router.post("/:planId/apply-to-company", protect, uploadFiles, studentController.applyToCompany);
router.post('/internships/apply/:internshipId', protect, studentController.applyForInternship);
router.get('/internships', studentController.getAllInternships);

module.exports = router;