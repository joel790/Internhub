const express = require("express");
const { applyToCompany, getAllCompanies } = require("../controllers/companyController");
const {protect}=require("../middleware/authMiddleware")
const router = express.Router();

router.post("/apply",protect, applyToCompany);
router.get("/", getAllCompanies);



module.exports = router;
