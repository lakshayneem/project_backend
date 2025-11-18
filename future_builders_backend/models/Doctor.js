import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    doctorId: { type: String, unique: true }, // D001, D002...

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    speciality: { type: String },
    experience: { type: Number },
    qualification: { type: String },
    fee: { type: Number },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
