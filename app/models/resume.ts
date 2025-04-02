import { create } from "domain";
import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },

  fileName: String,
  fileUrl: String,
  parsedText: String,
  extractedData:{
    skills: [String],
    experience: String,
    education: String,
    jobTitle: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Resume = mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);