import Doctor from "../models/Doctor.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (error) {
    console.error("Get All Doctors Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDoctorsBySpeciality = async (req, res) => {
  try {
    const speciality = req.params.speciality;
    const doctors = await Doctor.find({ speciality }).select("-password");

    res.json(doctors);
  } catch (error) {
    console.error("Get Doctors Speciality Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
