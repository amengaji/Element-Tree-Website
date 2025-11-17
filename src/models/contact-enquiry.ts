import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactEnquiry extends Document {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  interest?: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, index: true },
    company: { type: String },
    country: { type: String },
    interest: { type: String },
    message: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const ContactEnquiry: Model<IContactEnquiry> =
  mongoose.models.ContactEnquiry ||
  mongoose.model<IContactEnquiry>("ContactEnquiry", ContactEnquirySchema);
