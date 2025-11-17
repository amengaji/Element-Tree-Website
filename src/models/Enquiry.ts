// src/models/Enquiry.ts
import mongoose, { Schema, model, models } from "mongoose";

const EnquirySchema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    company: String,
    country: String,
    interest: String,
    message: String,
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default models.Enquiry || model("Enquiry", EnquirySchema);
