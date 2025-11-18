import { useEffect, useState } from "react";
import { getUpcoming, getHistory, cancelAppointment } from "../api/appointmentApi";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);

  const loadData = async () => {
    const u = await getUpcoming();
    const h = await getHistory();

    setUpcoming(u.data);
    setHistory(h.data);
  };

  const cancel = async (id) => {
    await cancelAppointment(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      <Link
        to="/patient/doctors"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Appointment
      </Link>

      {/* UPCOMING */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Upcoming Appointments</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        upcoming.map((a) => (
          <div key={a._id} className="border p-3 my-2 rounded">
            <p><strong>Doctor:</strong> {a.doctor?.name}</p>
            <p><strong>Date:</strong> {a.date}</p>
            <p><strong>Time:</strong> {a.timeSlot}</p>
            <p><strong>Status:</strong> {a.status}</p>

            {["pending", "accepted"].includes(a.status) && (
              <button
                onClick={() => cancel(a._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        ))
      )}

      {/* HISTORY */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Past Appointments</h2>
      {history.length === 0 ? (
        <p>No past appointments.</p>
      ) : (
        history.map((a) => (
          <div key={a._id} className="border p-3 my-2 rounded">
            <p><strong>Doctor:</strong> {a.doctor?.name}</p>
            <p><strong>Date:</strong> {a.date}</p>
            <p><strong>Notes:</strong> {a.notes || "No notes"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDashboard;
