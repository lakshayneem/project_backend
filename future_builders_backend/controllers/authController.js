import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// -----------------------------------------------
// PATIENT REGISTER (Auto ID: P001, P002...)
// -----------------------------------------------
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate new patientId
    const lastPatient = await Patient.findOne().sort({ _id: -1 });
    let newIdNumber = 1;

    if (lastPatient && lastPatient.patientId) {
      const lastId = parseInt(lastPatient.patientId.replace("P", ""));
      newIdNumber = lastId + 1;
    }

    const generatedPatientId = "P" + String(newIdNumber).padStart(3, "0");

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      patientId: generatedPatientId,
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(patient._id, "patient");

    return res.status(201).json({
      message: "Patient registered successfully",
      user: {
        id: patient._id,
        patientId: patient.patientId,
        name: patient.name,
        email: patient.email,
        role: "patient",
      },
      token,
    });
  } catch (error) {
    console.error("Register Patient Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// PATIENT LOGIN
// -----------------------------------------------
export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(patient._id, "patient");

    return res.json({
      message: "Patient logged in successfully",
      user: {
        id: patient._id,
        patientId: patient.patientId,
        name: patient.name,
        email: patient.email,
        role: "patient",
      },
      token,
    });
  } catch (error) {
    console.error("Login Patient Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// DOCTOR LOGIN
// -----------------------------------------------
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(doctor._id, "doctor");

    return res.json({
      message: "Doctor logged in successfully",
      user: {
        id: doctor._id,
        doctorId: doctor.doctorId,
        name: doctor.name,
        email: doctor.email,
        speciality: doctor.speciality,
        role: "doctor",
      },
      token,
    });
  } catch (error) {
    console.error("Login Doctor Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// ADMIN LOGIN
// -----------------------------------------------
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin._id, "admin");

    return res.json({
      message: "Admin logged in successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
      token,
    });
  } catch (error) {
    console.error("Login Admin Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
