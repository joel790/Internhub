const CompanyApplication = require("../models/companyApplication");
const Application = require("../models/internApplicationModel");
const User = require("../models/userModel");
const Plan = require("../models/planModel");
const Internship = require("../models/internshipModel");

// Approve company application
exports.approveCompanyApplication = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await CompanyApplication.findById(
      applicationId
    ).populate("user");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (application.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Application has already been processed" });
    }
    const user = application.user;
    user.role = "company";
    user.companyDetails = {
      name: application.name,
      slogan: application.slogan,
      description: application.description,
      industry: application.industry,
      location: application.location,
      managerName: application.managerName,
      jobTitle: application.jobTitle,
      contactNumber: application.contactNumber,
      website: application.website,
      license: application.license,
      logo: application.logo,
      subscriptionPlan: application.subscriptionPlan,
    };
    await user.save();
    application.status = "approved";
    await application.save();
    res
      .status(200)
      .json({ message: "Company application approved", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject company application
exports.rejectCompanyApplication = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await CompanyApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (application.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Application has already been processed" });
    }
    application.status = "rejected";
    await application.save();
    res
      .status(200)
      .json({ message: "Company application rejected", application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all company applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await CompanyApplication.find().populate(
      "user subscriptionPlan"
    );
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Filter companies by status
exports.filterCompaniesByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const companies = await User.find({
      role: "company",
      "companyDetails.status": status,
    });
    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json({ companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await User.find({ role: "company" })
      .populate("companyDetails.internships")
      .populate("companyDetails.subscriptionPlan");
    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }
    res.status(200).json({ companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await User.findOne({ _id: companyId, role: "company" })
      .select("-password")
      .populate("companyDetails.internships")
      .populate("companyDetails.subscriptionPlan");
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete company by ID
exports.deleteCompanyById = async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await User.findOne({ _id: companyId, role: "company" });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create plan
exports.createPlan = async (req, res) => {
  const { type, price, features } = req.body;
  try {
    const plan = new Plan({
      type,
      price,
      features,
    });
    const savedPlan = await plan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update plan
exports.updatePlan = async (req, res) => {
  const { planId } = req.params;
  const { type, price, features } = req.body;
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      planId,
      { type, price, features },
      { new: true }
    );
    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Aggregation for applications over time
exports.getApplicationsOverTime = async (req, res) => {
  try {
    const applicationsOverTime = await Application.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
    res.status(200).json(applicationsOverTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Aggregation for companies over time
exports.getCompaniesOverTime = async (req, res) => {
  try {
    const companiesOverTime = await User.aggregate([
      { $match: { role: "company" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
    res.status(200).json(companiesOverTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Aggregation for application status counts
exports.getApplicationStatusCounts = async (req, res) => {
  try {
    const applicationStatusCounts = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(applicationStatusCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Aggregation for internships over time
exports.getInternshipsOverTime = async (req, res) => {
  try {
    const internshipsOverTime = await Internship.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
    res.status(200).json(internshipsOverTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get recent applications
exports.getRecentApplications = async (req, res) => {
  try {
    const recentApplications = await Application.find()
      .populate("internship", "title")
      .populate("student", "name")
      .sort({ date: -1 })
      .limit(10);
    res.status(200).json(recentApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get active internships
exports.getActiveInternships = async (req, res) => {
  try {
    const activeInternships = await Internship.find({
      deadline: { $gte: new Date() },
    })
      .populate("company", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(activeInternships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
