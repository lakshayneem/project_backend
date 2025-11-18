import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Left side */}
      <div className="text-xl font-bold">
        <Link to="/">Future Builders</Link>
      </div>

      {/* Right side */}
      <div className="flex gap-6 items-center">

        {!user && (
          <>
            <Link to="/patient/login" className="hover:text-gray-200">Patient Login</Link>
            <Link to="/patient/register" className="hover:text-gray-200">Patient Register</Link>
            <Link to="/doctor/login" className="hover:text-gray-200">Doctor Login</Link>
            <Link to="/admin/login" className="hover:text-gray-200">Admin Login</Link>
          </>
        )}

        {user?.role === "patient" && (
          <Link to="/patient/dashboard" className="hover:text-gray-200">Dashboard</Link>
        )}

        {user?.role === "doctor" && (
          <Link to="/doctor/pending" className="hover:text-gray-200">Dashboard</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin/dashboard" className="hover:text-gray-200">Dashboard</Link>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
