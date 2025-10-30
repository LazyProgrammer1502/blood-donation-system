import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import AddAdmin from "../components/AddAdmin";
import bgLogo from "../assets/life_saver_kust_logo.png";

const ManageAdmins = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Ahsan Khan",
      email: "ahsan@kust.edu.pk",
      role: "Admin",
      regno: "kust1234",
    },
    {
      id: 2,
      name: "Fatima Noor",
      email: "fatima@kust.edu.pk",
      role: "Admin",
      regno: "kust2345",
    },
  ]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  Restore login and role from localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("adminRole");
    if (storedLogin === "true" && storedRole) {
      setIsLoggedIn(true);
      setAdminRole(storedRole);
    } else {
      navigate("/admin"); // redirect to login if not logged in
    }
  }, [navigate]);

  const handleAddAdmin = (newAdmin) => {
    if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === editingAdmin.id ? { ...a, ...newAdmin } : a))
      );
      setEditingAdmin(null);
    } else {
      setAdmins((prev) => [...prev, { ...newAdmin, id: Date.now() }]);
    }
    setShowAddAdmin(false);
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setShowAddAdmin(true);
  };

  const handleDeleteAdmin = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminRole");
    setIsLoggedIn(false);
    navigate("/admin");
  };

  if (!isLoggedIn) return null; // prevent rendering if not logged in

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-100 via-red-50 to-white overflow-hidden">
      {/*  Background Logo */}
      <div className="fixed inset-0 flex justify-center items-center opacity-10 pointer-events-none z-0">
        <img
          src={bgLogo}
          alt="Life Saver Logo"
          className="w-[70%] sm:w-[50%] md:w-[35%] lg:w-[30%] object-contain"
        />
      </div>

      {/*  Navbar */}
      <Navbar
        hideSearch={true}
        showHamburger={true}
        extraButtons={
          <div className="flex items-center gap-3 ml-auto pr-4">
            {adminRole === "super-admin" && (
              <button
                onClick={() => setShowAddAdmin(true)}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-md"
              >
                + Add Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
              Logout
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <div className="relative z-10 pt-28 px-6 sm:px-10 max-w-6xl mx-auto">
        {/* Admin Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition-all duration-300"
            >
              <h2>
                NAME:{" "}
                <span className=" font-semibold text-red-700">
                  {admin.name}
                </span>
              </h2>
              <p>
                EMAIL:{" "}
                <span className="text-gray-600 text-sm">{admin.email}</span>{" "}
              </p>
              <p>
                Reg No:{" "}
                <span className="text-gray-500 text-sm ">{admin.regno}</span>{" "}
              </p>
              <p>
                ROLE:{" "}
                <span className="text-gray-500 text-sm">{admin.role}</span>
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleEditAdmin(admin)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAdmin(admin.id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <AddAdmin
              onClose={() => {
                setShowAddAdmin(false);
                setEditingAdmin(null);
              }}
              onSubmit={handleAddAdmin}
              initialData={editingAdmin}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
