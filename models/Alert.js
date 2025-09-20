import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // Add index for faster queries
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      enum: ["google", "linkedin"],
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    frequency: {
      type: String,
      enum: ["hourly", "daily", "weekly"],
      default: "daily",
    },
    status: {
      type: String,
      enum: ["active", "paused", "inactive"],
      default: "active",
    },
    lastChecked: {
      type: Date,
      default: Date.now,
    },
    lastJobs: {
      type: [String], // Array of job IDs or hashes
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Alert || mongoose.model("Alert", AlertSchema);
