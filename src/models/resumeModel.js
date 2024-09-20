import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, },
  address: { type: String, },
  skills: { type: String,},
  experience: { type: String },
  education: { type: String },
  portfolio: { type: String },
  linkedin: { type: String },
  github: { type: String },
  projects: { type: String },
  resumeGenerated: { type: Boolean, default: false },
});

const Resume = mongoose.models.Resume || mongoose.model('Resume', userSchema);
export default Resume;
