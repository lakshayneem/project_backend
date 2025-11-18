import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

// ----------------------------------------------------------
// BOOK APPOINTMENT
// ----------------------------------------------------------
export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { doctorId, date, timeSlot } = req.body;

    if (!doctorId || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const existing = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
      status: { $in: ["pending", "accepted"] },
    });

    if (existing) {
      return res.status(400).json({
        message: "Doctor already booked for this slot",
      });
    }

    const lastAppointment = await Appointment.findOne().sort({ _id: -1 });
    let newId = 1;
    if (lastAppointment?.appointmentId) {
      const lastNum = parseInt(lastAppointment.appointmentId.replace("A", ""));
      if (!isNaN(lastNum)) newId = lastNum + 1;
    }

    const appointmentId = "A" + String(newId).padStart(3, "0");

    const appointment = await Appointment.create({
      appointmentId,
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      status: "pending",
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.error("Book Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------------------
// PATIENT UPCOMING
// ----------------------------------------------------------
export const patientUpcoming = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appts = await Appointment.find({
      patient: patientId,
      status: { $in: ["pending", "accepted"] },
    })
      .populate("doctor", "name speciality")
      .sort({ date: 1 });

    res.json(appts);

  } catch (error) {
    console.error("Upcoming Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------------------
// PATIENT HISTORY
// ----------------------------------------------------------
export const patientHistory = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appts = await Appointment.find({
      patient: patientId,
      status: "completed",
    })
      .populate("doctor", "name speciality")
      .sort({ date: -1 });

    res.json(appts);

  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------------------
// PATIENT CANCEL
// ----------------------------------------------------------
export const cancelAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { appointmentId } = req.params;

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    if (appt.patient.toString() !== patientId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!["pending", "accepted"].includes(appt.status)) {
      return res.status(400).json({ message: "Cannot cancel this appointment" });
    }

    appt.status = "cancelled";
    await appt.save();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (error) {
    console.error("Cancel Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------------------
// DOCTOR ACCEPT
// ----------------------------------------------------------
export const acceptAppointment = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { appointmentId } = req.params;

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    if (appt.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    appt.status = "accepted";
    await appt.save();

    res.json({ message: "Appointment accepted successfully" });

  } catch (error) {
    console.error("Accept Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------------------
// DOCTOR REJECT
// ----------------------------------------------------------
export const rejectAppointment = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { appointmentId } = req.params;

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    if (appt.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    appt.status = "rejected";
    appt.rejectionReason = "Not available by doctor";
    await appt.save();

    res.json({ message: "Appointment rejected" });

  } catch (error) {
    console.error("Reject Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------------------
// DOCTOR COMPLETE
// ----------------------------------------------------------
export const completeAppointment = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { appointmentId } = req.params;
    const { notes } = req.body;

    const appt = await Appointment.findById(appointmentId);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    if (appt.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    appt.status = "completed";
    appt.notes = notes;
    await appt.save();

    res.json({ message: "Appointment completed", appt });

  } catch (error) {
    console.error("Complete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
