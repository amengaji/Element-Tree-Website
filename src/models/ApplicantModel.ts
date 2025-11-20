// src/models/ApplicantModel.ts
import mongoose, { Schema, models } from "mongoose";

const applicantSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    portfolio: { type: String },
    linkedin: { type: String },
    resumeUrl: { type: String },
    coverLetter: { type: String },

    department: { type: String, required: true },
    role: { type: String, required: true },

    experience: { type: String },
    country: { type: String },

    status: {
      type: String,
      enum: ["New", "Pending", "Reviewed", "Rejected"],
      default: "New",
    },

    currentRole: { type: String },
    roleAnswers: { type: Object },
    stepVersion: { type: String },
  },
  { timestamps: true }
);

// ✅ Only ONE model export — clean & safe:
const ApplicantModel =
  models.Applicant || mongoose.model("Applicant", applicantSchema);

export default ApplicantModel;
