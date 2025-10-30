import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import AdminLogin from "../components/AdminLogin";
import DonorList from "../pages/DonorList";
import AddDonor from "../components/AddDonor";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminRole, setAdminRole] = useState(null);
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);

  //  Persist login using localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("adminRole");
    if (storedLogin === "true" && storedRole) {
      setIsLoggedIn(true);
      setAdminRole(storedRole);
    }
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleLogin = (credentials) => {
    if (
      credentials.email === "superadmin@kust.edu.pk" &&
      credentials.password === "super123"
    ) {
      setIsLoggedIn(true);
      setAdminRole("super-admin");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminRole", "super-admin");
    } else if (
      credentials.email === "admin@kust.edu.pk" &&
      credentials.password === "admin123"
    ) {
      setIsLoggedIn(true);
      setAdminRole("admin");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminRole", "admin");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminRole");
  };

  const handleAddDonor = (newDonor) => {
    if (editingDonor) console.log("Donor updated:", newDonor);
    else console.log("New donor added:", newDonor);
    setShowAddDonor(false);
  };

  const handleEditDonor = (donor) => {
    setEditingDonor(donor);
    setShowAddDonor(true);
  };

  const handleDeleteDonor = (donor) => {
    console.log("Deleting donor:", donor);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-100 via-red-50 to-white overflow-hidden">
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <>
          <Navbar
            hideSearch={false}
            showHamburger={true}
            extraButtons={
              <div className="flex flex-wrap gap-3">
                {adminRole === "super-admin" && (
                  <button
                    onClick={() => navigate("/manage-admins")}
                    className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all"
                  >
                    Manage Admins
                  </button>
                )}

                {/*  Events & Certificates (With CRUD Operatins For both Admin and Super Admin) */}
                <button
                  onClick={() => navigate("/adminevents&certificates")}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all"
                >
                  Events & Certificates
                </button>

                {/* Add Donor Button */}
                <button
                  onClick={() => {
                    setEditingDonor(null);
                    setShowAddDonor(true);
                  }}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                >
                  + Add Donor
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Logout
                </button>
              </div>
            }
          />

          <div
            className="relative z-10 px-6 sm:px-10 bottom-20"
            style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
          >
            <DonorList
              hideSearch={false}
              showRequestForm={false}
              isAdmin={true}
              onEditDonor={handleEditDonor}
              onDeleteDonor={handleDeleteDonor}
            />
          </div>

          {showAddDonor && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
              <div className="rounded-lg shadow-lg p-6 w-full max-w-lg bg-white">
                <AddDonor
                  onClose={() => {
                    setShowAddDonor(false);
                    setEditingDonor(null);
                  }}
                  onSubmit={handleAddDonor}
                  initialData={editingDonor}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
