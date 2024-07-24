const express = require("express");
const adminController = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.put(
  "/applications/:applicationId/approve",
  protect,
  admin,
  adminController.approveCompanyApplication
);

router.put(
  "/applications/:applicationId/reject",
  protect,
  admin,
  adminController.rejectCompanyApplication
);

router.get("/applications", protect, admin, adminController.getAllApplications);

router.get(
  "/companies/status/:status",
  protect,
  admin,
  adminController.filterCompaniesByStatus
);

router.get("/companies", protect, admin, adminController.getAllCompanies);

router.get(
  "/companies/:companyId",
  protect,
  admin,
  adminController.getCompanyById
);

router.delete(
  "/companies/:companyId",
  protect,
  admin,
  adminController.deleteCompanyById
);

router.post("/plans", protect, admin, adminController.createPlan);

router.put("/plans/:planId", protect, admin, adminController.updatePlan);

router.get("/plans", protect, admin, adminController.getAllPlans);

router.get(
  "/applications/over-time",
  protect,
  admin,
  adminController.getApplicationsOverTime
);

router.get(
  "/companies/over-time",
  protect,
  admin,
  adminController.getCompaniesOverTime
);

router.get(
  "/applications/status-counts",
  protect,
  admin,
  adminController.getApplicationStatusCounts
);

router.get(
  "/internships/over-time",
  protect,
  admin,
  adminController.getInternshipsOverTime
);

router.get(
  "/recent-applications",
  protect,
  admin,
  adminController.getRecentApplications
);

router.get(
  "/active-internships",
  protect,
  admin,
  adminController.getActiveInternships
);

module.exports = router;
