import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bgLogo from "../assets/life_saver_kust_logo.png";
import Navbar from "../components/NavBar";
import DonorCard from "../components/DonorCard";
import DonorRequestForm from "../components/DonorRequestForm";

const donors = [
  {
    name: "Ali Khan",
    bloodGroup: "A+",
    department: "IT",
    regNo: "KUST123",
    contactNo: "03001234567",
    lastDonation: "2025-06-10",
    available: true,
  },
  {
    name: "Sara Ahmed",
    bloodGroup: "O-",
    department: "Biotech",
    regNo: "KUST456",
    contactNo: "03111234567",
    lastDonation: "2025-08-15",
    available: false,
  },
  {
    name: "Usman Shah",
    bloodGroup: "B+",
    department: "Chemistry",
    regNo: "KUST789",
    contactNo: "03221234567",
    lastDonation: "2025-05-22",
    available: true,
  },
  {
    name: "Fatima Noor",
    bloodGroup: "AB+",
    department: "Physics",
    regNo: "KUST101",
    contactNo: "03451234567",
    lastDonation: "2025-07-05",
    available: true,
  },
  {
    name: "Hassan Raza",
    bloodGroup: "O+",
    department: "Math",
    regNo: "KUST202",
    contactNo: "03081234567",
    lastDonation: "2025-02-19",
    available: false,
  },
];

const DonorList = ({
  showRequestForm = true,
  filteredDonors: externalFilteredDonors,
  isAdmin = false,
  onEditDonor,
  onDeleteDonor,
}) => {
  const [showPopup, setShowPopup] = useState(showRequestForm); // show popup only if allowed
  const [filteredDonors, setFilteredDonors] = useState([]);

  // For admin, pass filteredDonors from parent
  useEffect(() => {
    if (!showRequestForm && externalFilteredDonors) {
      setFilteredDonors(externalFilteredDonors);
    }
  }, [externalFilteredDonors, showRequestForm]);

  // Disable global page scroll only for request form
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [showPopup]);

  const handleFormSubmit = (formData) => {
    const result = donors.filter(
      (donor) => donor.bloodGroup === formData.bloodGroup && donor.available
    );
    setFilteredDonors(result);
    setShowPopup(false);
  };

  // For admin view, if showRequestForm is false, show all donors by default
  const donorsToShow = showRequestForm ? filteredDonors : donors;

  return (
    <div className="relative flex flex-col bg-gradient-to-br from-white via-red-50 to-red-100 h-screen overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <img
          src={bgLogo}
          alt="Background Logo"
          className="w-[55%] sm:w-[45%] md:w-[35%] lg:w-[30%] opacity-10"
          style={{
            filter: "brightness(1.15) contrast(1.1) saturate(1.2)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600/90 via-red-500/85 to-red-400/80 backdrop-blur-md shadow-lg border-b border-red-200">
        <Navbar hideSearch={true} isAdmin={false} />
      </div>

      {/* Donor Cards Section (scrollable area only) */}
      <div
        className="relative z-10 px-4 pb-10 max-w-7xl mx-auto w-full overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-100"
        style={{
          height: "calc(100vh - 80px)", // leaves space for navbar
          marginTop: "80px", // pushes content below navbar
        }}
      >
        {donorsToShow.length > 0 ? (
          <motion.div
            className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
          >
            {donorsToShow.map((donor, index) => (
              <motion.div
                key={index}
                className="border border-red-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/70 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <DonorCard
                  {...donor}
                  isAdmin={isAdmin}
                  onEdit={() => onEditDonor(donor)}
                  onDelete={() => onDeleteDonor(donor)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Please fill the form to find available donors.
          </p>
        )}
      </div>

      {/* Popup Form (only if showRequestForm is true) */}
      {showRequestForm && showPopup && (
        <DonorRequestForm
          onClose={() => setShowPopup(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default DonorList;
