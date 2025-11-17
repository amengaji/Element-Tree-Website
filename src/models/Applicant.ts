// src/models/Applicant.ts
import mongoose, { Schema, model, models } from "mongoose";

const ApplicantSchema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    portfolio: String,
    linkedin: String,
    resumeUrl: String,
    coverLetter: String,
    department: String,
    role: String,
    experience: String,
    country: String,
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default models.Applicant || model("Applicant", ApplicantSchema);
