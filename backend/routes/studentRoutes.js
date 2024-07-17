const express = require("express")
const studentController = require("../controllers/studentController")
const multer=require("multer")
const { protect } = require('../middleware/authMiddleware');
const router = express.Router()
//apply for company
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/uploads")
        
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    });
    const uploads = multer({ storage: storage });
    const uploadLicense = uploads.single('license');
const uploadLogo = uploads.single('logo');
//middlewire for file uploads
const uploadFiles = (req, res, next) => {
    uploadLicense(req, res, (err) => {
      if (err) {
        return next(err);
      }
      uploadLogo(req, res, (err) => {
        if (err) {
          return next(err);
        }
        next();
      });
    });
  };

router.post('/selectplan', protect, studentController.selectPlan);
router.get('/payment/callback', studentController.paymentCallback);
//apply for company
router.post("/:planId/apply-to-company", protect, uploadFiles,studentController.applyToCompany);
// Apply for an internship
router.post('/internships/apply/:internshipId', protect, studentController.applyForInternship);
router.get('/internships', studentController.getAllInternships);
module.exports = router;