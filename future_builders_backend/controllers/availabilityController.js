import Availability from "../models/Availability.js";

// Create or get doctor's availability document
const ensureAvailabilityDoc = async (doctorId) => {
  let doc = await Availability.findOne({ doctor: doctorId });
  if (!doc) {
    doc = await Availability.create({ doctor: doctorId });
  }
  return doc;
};

// Add unavailable date
export const addUnavailableDate = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required." });
    }

    const availability = await ensureAvailabilityDoc(doctorId);

    if (!availability.unavailableDates.includes(date)) {
      availability.unavailableDates.push(date);
      await availability.save();
    }

    res.json({ message: "Unavailable date added successfully", availability });
  } catch (error) {
    console.error("Add unavailable date error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add unavailable slot
export const addUnavailableSlot = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { date, timeSlot } = req.body;

    if (!date || !timeSlot) {
      return res.status(400).json({ message: "Date and timeSlot are required" });
    }

    const availability = await ensureAvailabilityDoc(doctorId);

    availability.unavailableSlots.push({ date, timeSlot });
    await availability.save();

    res.json({ message: "Unavailable slot added successfully", availability });
  } catch (error) {
    console.error("Add unavailable slot error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get availability
export const getAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const availability = await ensureAvailabilityDoc(doctorId);
    res.json(availability);
  } catch (error) {
    console.error("Get availability error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
