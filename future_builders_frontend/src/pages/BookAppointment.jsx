import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookAppointment } from "../api/appointmentApi";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const navigate = useNavigate();

  const book = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment({ doctorId, date, timeSlot });
      alert("Appointment booked!");
      navigate("/patient/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>

      <form onSubmit={book} className="space-y-4">
        <div>
          <label>Date:</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Time Slot:</label>
          <input
            type="time"
            className="w-full border px-3 py-2 rounded"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
