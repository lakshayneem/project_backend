import Appointment from "../models/Appointment.js";

// ============================
// 1. UPCOMING APPOINTMENTS
// ============================
export const getUpcomingAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({
      patient: patientId,
      status: { $in: ["pending", "accepted"] },
    })
      .populate("doctor", "name email speciality doctorId")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("Get Upcoming Appointments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// 2. PAST / HISTORY
// ============================
export const getPastAppointments = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({
      patient: patientId,
      status: { $in: ["completed", "rejected", "cancelled"] },
    })
      .populate("doctor", "name email speciality doctorId")
      .sort({ date: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Get Past Appointments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// 3. LATEST PRESCRIPTION / NOTES
// ============================
export const getLatestNotes = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointment = await Appointment.findOne({
      patient: patientId,
      status: "completed",
      notes: { $ne: "" }
    })
      .populate("doctor", "name speciality doctorId")
      .sort({ updatedAt: -1 });

    if (!appointment) {
      return res.json({ message: "No notes found yet" });
    }

    res.json({
      appointmentId: appointment.appointmentId,
      notes: appointment.notes,
      doctor: appointment.doctor,
      updatedAt: appointment.updatedAt
    });
  } catch (error) {
    console.error("Get Notes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
