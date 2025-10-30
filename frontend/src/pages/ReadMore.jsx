import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import bgLogo from "../assets/life_saver_kust_logo.png";

const ReadMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const [zoomedIndex, setZoomedIndex] = useState(null);

  // Sample gallery images for this event
  const galleryImages = [
    "https://images.unsplash.com/photo-1582719478252-abc123?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1582719478253-def456?auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1582719478254-ghi789?auto=format&fit=crop&w=800&q=60",
  ];

  useEffect(() => {
    if (!event) {
      navigate("/events&certificates");
    }
  }, [event, navigate]);

  if (!event) return null;

  const openZoom = (index) => setZoomedIndex(index);
  const closeZoom = () => setZoomedIndex(null);

  const nextImage = () => {
    setZoomedIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setZoomedIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100 overflow-y-auto">
      {/* Background Logo */}
      <div className="fixed inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img
          src={bgLogo}
          alt="Life Saver Logo"
          className="w-[70%] sm:w-[50%] md:w-[35%] lg:w-[30%] object-contain"
        />
      </div>

      {/* Navbar */}
      <Navbar hideSearch={true} />

      {/* Event Content */}
      <div className="relative z-10 pt-28 pb-16 px-6 max-w-4xl mx-auto text-center text-red-800">
        {/* Main Event Image */}
        <motion.img
          src={event.image}
          alt={event.title}
          className="rounded-xl shadow-lg w-full max-h-[450px] object-cover mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Gallery Images below Main Image */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className="rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => openZoom(index)}
            />
          ))}
        </div>

        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {event.title}
        </motion.h1>

        <motion.p
          className="text-sm text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Posted on {event.date}
        </motion.p>

        <motion.p
          className="text-lg text-gray-700 leading-relaxed bg-white/80 backdrop-blur-md border border-red-200 rounded-xl p-6 shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {event.fullDetails}
        </motion.p>

        <motion.button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          ← Back to Events
        </motion.button>
      </div>

      {/* Zoom Modal */}
      {zoomedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <button
            onClick={closeZoom}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
          >
            &times;
          </button>
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-3xl font-bold"
          >
            &#8249;
          </button>
          <img
            src={galleryImages[zoomedIndex]}
            alt={`Zoomed ${zoomedIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-xl"
          />
          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-3xl font-bold"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
