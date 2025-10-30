import React, { useState } from "react";
import Navbar from "../components/NavBar";
import EventCards from "../components/EventCards";
import bgLogo from "../assets/life_saver_kust_logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const AdminEventandCertificates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEventsPage = location.pathname === "/adminevents&certificates";
  const isCertificatesPage = location.pathname === "/admincertificates";
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Blood Donation Drive",
      date: "15 Nov 2025",
      description:
        "Join us for a life-saving blood donation event at KUST main auditorium.",
      image: "https://placehold.co/600x400",
      galleryImages: [
        "https://placehold.co/200x200",
        "https://placehold.co/200x200",
      ],
    },
    {
      id: 2,
      title: "Health Awareness Seminar",
      date: "22 Nov 2025",
      description:
        "A seminar focusing on blood health, donation benefits, and student engagement.",
      image: "https://placehold.co/600x400",
      galleryImages: [
        "https://placehold.co/200x200",
        "https://placehold.co/200x200",
      ],
    },
  ]);

  const adminRole = (localStorage.getItem("adminRole") || "")
    .trim()
    .toLowerCase();
  const isSuperAdmin = adminRole === "super-admin";

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    headerImage: null,
    galleryImages: [],
  });

  // --- Add Event ---
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEv = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      image: newEvent.headerImage
        ? URL.createObjectURL(newEvent.headerImage)
        : "",
      galleryImages: newEvent.galleryImages.map((file) =>
        URL.createObjectURL(file)
      ),
    };
    setEvents([...events, newEv]);
    setShowModal(false);
    resetForm();
  };

  // --- Delete Event ---
  const handleDelete = (id) => {
    if (!isSuperAdmin) return;
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  // --- Edit Event ---
  const handleEditClick = (event) => {
    setIsEditing(true);
    setCurrentEventId(event.id);
    setNewEvent({
      title: event.title,
      date: event.date,
      description: event.description,
      headerImage: null,
      galleryImages: [],
    });
    setShowModal(true);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === currentEventId
          ? {
              ...ev,
              title: newEvent.title,
              date: newEvent.date,
              description: newEvent.description,
            }
          : ev
      )
    );
    setShowModal(false);
    setIsEditing(false);
    setCurrentEventId(null);
    resetForm();
  };

  // --- Reset form helper ---
  const resetForm = () => {
    setNewEvent({
      title: "",
      date: "",
      description: "",
      headerImage: null,
      galleryImages: [],
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100 overflow-y-auto">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <img
          src={bgLogo}
          alt="Background Logo"
          className="w-[60%] md:w-[40%] lg:w-[30%] object-contain"
        />
      </div>

      {/* Navbar */}
      <Navbar
        hideSearch={true}
        showHamburger={true}
        extraButtons={
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm sm:text-base"
            >
              + Add Event
            </button>

            <button
              onClick={() => navigate("/adminevents&certificates")}
              className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                isEventsPage
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigate("/admincertificates")}
              className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                isCertificatesPage
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Certificates
            </button>
          </div>
        }
      />

      {/* Events Grid */}
      <div className="relative z-10 pt-24 px-6 md:px-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {events.map((event) => (
          <EventCards
            key={event.id}
            event={event}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            isSuperAdmin={isSuperAdmin}
          />
        ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form
            onSubmit={isEditing ? handleUpdateEvent : handleAddEvent}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
              {isEditing ? "Edit Event" : "Add New Event"}
            </h2>

            {/* Title */}
            <input
              type="text"
              placeholder="Event Title"
              required
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            {/* Date */}
            <input
              type="date"
              required
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            {/* Description */}
            <textarea
              placeholder="Full Description"
              required
              rows="4"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full resize-none"
            />

            {/* Only for Add */}
            {!isEditing && (
              <>
                <div className="mb-3">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Header Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        headerImage: e.target.files[0],
                      })
                    }
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer p-2"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 font-semibold mb-1">
                    Gallery Images (Up to 9)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files).slice(0, 9);
                      setNewEvent({ ...newEvent, galleryImages: files });
                    }}
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer p-2"
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  resetForm(); // <-- reset on cancel
                }}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold rounded-lg hover:scale-105 transition-all"
              >
                {isEditing ? "Update Event" : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminEventandCertificates;
