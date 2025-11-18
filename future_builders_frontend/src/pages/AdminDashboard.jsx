import { useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createDoctor = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/doctors", form);

      alert("Doctor created!");
      setForm({ name: "", email: "", password: "", speciality: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <form onSubmit={createDoctor} className="space-y-4">

        <input
          name="name"
          placeholder="Doctor Name"
          className="w-full border px-3 py-2 rounded"
          onChange={handle}
          value={form.name}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={handle}
          value={form.email}
        />

        <input
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handle}
          value={form.password}
        />

        <input
          name="speciality"
          placeholder="Speciality"
          className="w-full border px-3 py-2 rounded"
          onChange={handle}
          value={form.speciality}
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Create Doctor
        </button>

      </form>
    </div>
  );
};

export default AdminDashboard;
