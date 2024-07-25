const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { string } = require('joi');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
  },
  photo:{
    type:String,
    default:"https://pngtree.com/freepng/avatar-bussinesman-man-profile-icon-vector-illustration_7268049.html"
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'company', 'admin'],
    default: 'student'
  },
  // Additional fields for company details (populated only for company role)
  companyDetails: {
    name: {
      type: String
    },
    photo: {
      type: String,
      default:"https://pngtree.com/freepng/user-vector-avatar_4830521.html"
    },
    slogan: {
      type: String
    },
    mission: {
      type: String
    },
    vision: {
      type: String
    },
    description: {
      type: String
    },
    industry: {
      type: String
    },
    location: {
      type: String
    },
    managerName: {
      type: String
    },
    jobTitle: {
      type: String
    },
    contactNumber: [
      {
        type: String,
        required: true,
      }
    ],
    website: {
      type: String
    },
    license: {
      type: String
    },
    logo: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    internships: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship'
    }
    ],
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      default: null
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
}
);
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
