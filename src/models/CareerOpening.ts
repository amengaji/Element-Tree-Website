// src/models/CareerOpening.ts
import mongoose, { Schema, model, models } from "mongoose";

const CareerOpeningSchema = new Schema(
  {
    title: String,
    department: String,
    description: String,
    location: { type: String, default: "Remote" },
    status: { type: String, enum: ["active", "archived"], default: "active" },
  },
  { timestamps: true }
);

export default models.CareerOpening ||
  model("CareerOpening", CareerOpeningSchema);
