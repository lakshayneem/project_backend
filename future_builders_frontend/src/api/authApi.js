// import api from "./axios";

// // Patient
// export const patientRegister = (data) => api.post("/auth/patient/register", data);
// export const patientLogin = (data) => api.post("/auth/patient/login", data);

// // Doctor
// export const doctorLogin = (data) => api.post("/auth/doctor/login", data);

// // Admin
// export const adminLogin = (data) => api.post("/auth/admin/login", data);

import api from "./axios";

// Patient
export const patientRegister = (data) => api.post("/auth/patient/register", data);
export const patientLogin = (data) => api.post("/auth/patient/login", data);

// Doctor
export const doctorLogin = (data) => api.post("/auth/doctor/login", data);

// Admin
export const adminLogin = (data) => api.post("/auth/admin/login", data);

// Admin - Create Doctor
export const createDoctor = (data) => api.post("/admin/doctors", data);
