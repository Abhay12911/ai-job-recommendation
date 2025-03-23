import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title : String,
    company : String,
    location : String,
    skillsRequired : [String],
    jobLink : String,
});

export default mongoose.models.Job || mongoose.model("job", JobSchema);