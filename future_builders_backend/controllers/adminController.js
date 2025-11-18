// controllers/adminController.js
import bcrypt from "bcrypt";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

// CREATE DOCTOR (Admin only)
export const createDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, experience, qualification, fee } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, password required" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate doctorId: D001, D002...
    const lastDoctor = await Doctor.findOne().sort({ _id: -1 });
    let newIdNumber = 1;

    if (lastDoctor && lastDoctor.doctorId) {
      const lastId = parseInt(lastDoctor.doctorId.replace("D", ""));
      if (!isNaN(lastId)) newIdNumber = lastId + 1;
    }

    const generatedDoctorId = "D" + String(newIdNumber).padStart(3, "0");

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      doctorId: generatedDoctorId,
      name,
      email,
      password: hashedPassword,
      speciality,
      experience,
      qualification,
      fee,
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor: {
        id: doctor._id,
        doctorId: doctor.doctorId,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
      },
    });
  } catch (error) {
    console.error("Create Doctor Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL DOCTORS
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (error) {
    console.error("Get Doctors Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PATIENTS
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.json(patients);
  } catch (error) {
    console.error("Get Patients Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE DOCTOR
export const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params; // Mongo _id OR doctorId? We'll use Mongo _id here

    const deleted = await Doctor.findByIdAndDelete(doctorId);
    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Delete Doctor Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PATIENT
export const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params; // Mongo _id

    const deleted = await Patient.findByIdAndDelete(patientId);
    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Delete Patient Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
