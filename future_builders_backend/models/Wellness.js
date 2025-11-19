import mongoose from "mongoose";

const wellnessSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  date: {
    type: String, 
    required: true
  },
  water: { type: Number, default: 0 },
  steps: { type: Number, default: 0 },
  sleep: { type: Number, default: 0 },
  mood: { type: String, default: "Normal" }
});

wellnessSchema.index({ patient: 1, date: 1 }, { unique: true });

export default mongoose.model("Wellness", wellnessSchema);
