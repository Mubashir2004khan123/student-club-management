import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
  studentName: { type: String, required: true },
  clubName: { type: String, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
