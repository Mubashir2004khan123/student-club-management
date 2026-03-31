import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["social", "arts", "academic", "sports"], 
    required: true 
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  memberCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Club = mongoose.model("Club", clubSchema);
export default Club;
