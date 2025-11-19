import Wellness from "../models/Wellness.js";

// Update or create today's metrics
export const updateWellness = async (req, res) => {
  const patientId = req.user.id;
  const { water, steps, sleep, mood } = req.body;
  
  const today = new Date().toISOString().split("T")[0];

  const wellness = await Wellness.findOneAndUpdate(
    { patient: patientId, date: today },
    { water, steps, sleep, mood },
    { new: true, upsert: true }
  );

  res.json({ success: true, data: wellness });
};

// Get today's wellness data
export const getTodayWellness = async (req, res) => {
  const patientId = req.user.id;
  const today = new Date().toISOString().split("T")[0];

  const wellness = await Wellness.findOne({ patient: patientId, date: today });

  res.json({ success: true, data: wellness });
};
export const getWellnessHistory = async (req, res) => {
    const patientId = req.user.id;
  
    const history = await Wellness.find({ patient: patientId })
      .sort({ date: 1 })
      .limit(7);
  
    res.json({ success: true, data: history });
  };
  
