import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from "../api/appointmentApi";

const DoctorDashboard = () => {
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);

  const load = async () => {
    const resPending = await api.get("/doctor/appointments/pending");
    const resAccepted = await api.get("/doctor/appointments/accepted");

    setPending(resPending.data);
    setAccepted(resAccepted.data);
  };

  const accept = async (id) => {
    await acceptAppointment(id);
    load();
  };

  const reject = async (id) => {
    await rejectAppointment(id);
    load();
  };

  const complete = async (id) => {
    const notes = prompt("Enter notes:");
    if (!notes) return;

    await completeAppointment(id, notes);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      {/* Pending */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Pending Requests</h2>

      {pending.length === 0 ? (
        <p>No pending appointments.</p>
      ) : (
        pending.map((a) => (
          <div key={a._id} className="border p-3 my-2 rounded flex justify-between">
            <div>
              <p><strong>Patient:</strong> {a.patient.name}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.timeSlot}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => accept(a._id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>

              <button
                onClick={() => reject(a._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

      {/* Accepted */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Accepted Appointments</h2>

      {accepted.length === 0 ? (
        <p>No accepted appointments.</p>
      ) : (
        accepted.map((a) => (
          <div key={a._id} className="border p-3 my-2 rounded flex justify-between">
            <div>
              <p><strong>Patient:</strong> {a.patient.name}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.timeSlot}</p>
            </div>

            <button
              onClick={() => complete(a._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Complete
            </button>
          </div>
        ))
      )}

    </div>
  );
};

export default DoctorDashboard;
