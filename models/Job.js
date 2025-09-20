// 📁 models/Job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: true,
    },
    posted: {
      type: Date,
      default: Date.now,
    },
    alertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alert",
    },
    hash: {
      type: String,
      unique: true, // To prevent duplicate jobs
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
