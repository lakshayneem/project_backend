import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      unique: true
    },

    unavailableDates: [
      {
        type: String // Example: "2025-02-21"
      }
    ],

    unavailableSlots: [
      {
        date: { type: String },       // "2025-02-21"
        timeSlot: { type: String }    // "10:00 AM - 10:30 AM"
      }
    ]
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;
