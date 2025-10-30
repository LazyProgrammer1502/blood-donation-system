import React, { useState } from "react";

const DonorCard = ({
  name,
  bloodGroup,
  department,
  regNo,
  contactNo,
  lastDonation,
  available: initialAvailable,
  isAdmin = false,
  onEdit,
  onDelete,
  onToggleAvailability,
}) => {
  const [available, setAvailable] = useState(initialAvailable);

  const handleToggle = () => {
    const newStatus = !available;
    setAvailable(newStatus);
    if (onToggleAvailability)
      onToggleAvailability({ regNo, available: newStatus });
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-start gap-4 p-5 bg-white rounded-2xl shadow-lg border border-red-200 
                 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-sm mx-auto"
    >
      <div className="flex-1 flex flex-col gap-2 w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
          <h2 className="text-xl font-bold text-red-700 break-words">{name}</h2>
          <span
            className={`inline-flex px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold flex-shrink-0 self-start sm:self-auto ${
              available ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {available ? "Available" : "Not Available"}
          </span>
        </div>

        {/* Donor Details */}
        <p className="text-gray-700 font-semibold">
          Blood Group: <span className="text-red-600">{bloodGroup}</span>
        </p>
        <p className="text-gray-600">Department: {department}</p>
        <p className="text-gray-600">Reg No: {regNo}</p>
        {contactNo && (
          <p className="text-gray-600">
            Contact: <span className="text-red-600">{contactNo}</span>
          </p>
        )}
        <p className="text-gray-500">Last Donation: {lastDonation}</p>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-all"
            >
              Delete
            </button>
            <button
              onClick={handleToggle}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                available
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {available ? "Mark as Donated" : "Mark as Available"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorCard;
