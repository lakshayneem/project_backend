import Appointment from "../models/Appointment.js";

// ==============================
// 1. GET PENDING APPOINTMENTS
// ==============================
export const getPendingAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({
      doctor: doctorId,
      status: "pending",
    })
      .populate("patient", "name email patientId")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("Get Pending Appointments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// 2. GET ACCEPTED APPOINTMENTS
// ==============================
export const getAcceptedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
      status: "accepted",
    }).populate("patient", "name email patientId");

    res.json(appointments);
  } catch (error) {
    console.error("Get Accepted Appointments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// 3. GET COMPLETED APPOINTMENTS
// ==============================
export const getCompletedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
      status: "completed",
    }).populate("patient", "name email patientId");

    res.json(appointments);
  } catch (error) {
    console.error("Get Completed Appointments Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// 4. ACCEPT APPOINTMENT
// ==============================
export const acceptAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "accepted";
    await appointment.save();

    res.json({ message: "Appointment accepted successfully" });
  } catch (error) {
    console.error("Accept Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// 5. REJECT APPOINTMENT
// ==============================
export const rejectAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "rejected";
    appointment.rejectReason = "Not available by doctor";

    await appointment.save();

    res.json({ message: "Appointment rejected successfully" });
  } catch (error) {
    console.error("Reject Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// 6. COMPLETE APPOINTMENT + ADD NOTES
// ==============================
export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "completed";
    appointment.notes = notes;

    await appointment.save();

    res.json({ message: "Appointment completed with notes." });
  } catch (error) {
    console.error("Complete Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
