import api from "./axios";

// Patient
export const bookAppointment = (data) => api.post("/appointments/book", data);
export const getUpcoming = () => api.get("/appointments/patient/upcoming");
export const getHistory = () => api.get("/appointments/patient/history");
export const cancelAppointment = (id) => api.put(`/appointments/cancel/${id}`);

// Doctor
export const acceptAppointment = (id) => api.put(`/appointments/doctor/accept/${id}`);
export const rejectAppointment = (id) => api.put(`/appointments/doctor/reject/${id}`);
export const completeAppointment = (id, notes) =>
  api.put(`/appointments/doctor/complete/${id}`, { notes });
