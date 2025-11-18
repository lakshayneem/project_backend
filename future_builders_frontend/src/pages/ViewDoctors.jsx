import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Choose a Doctor</h1>

      {doctors.map((doc) => (
        <div
          key={doc._id}
          className="border p-4 my-3 rounded shadow-sm flex justify-between"
        >
          <div>
            <p className="font-semibold">{doc.name}</p>
            <p>Speciality: {doc.speciality || "General"}</p>
          </div>

          <Link
            to={`/patient/book/${doc._id}`}
            className="bg-green-600 text-white px-3 py-1 rounded h-fit"
          >
            Book
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ViewDoctors;
