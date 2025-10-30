import { useNavigate } from "react-router-dom";

const EventCards = ({ event, onEdit, onDelete, isSuperAdmin = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-red-200 p-4 w-full max-w-sm hover:shadow-lg transition-all duration-300">
      <img
        src={event.image || "https://placehold.co/600x400"}
        alt={event.title || "Event Image"}
        className="rounded-lg w-full h-48 object-cover mb-3"
      />
      <h2 className="text-xl font-bold text-red-700 mb-2">
        {event.title || "Untitled Event"}
      </h2>
      {event.date && (
        <p className="text-sm text-gray-500 mb-2">📅 {event.date}</p>
      )}
      <p className="text-gray-700 mb-3 line-clamp-3">
        {event.fullDetails || event.description || "No description provided."}
      </p>

      <div className="flex justify-between items-center">
        <button
          className="text-red-600 font-semibold hover:underline hover:text-red-700 transition-all"
          onClick={() =>
            navigate("/readmore", {
              state: {
                event: { ...event, galleryImages: event.galleryImages || [] },
              },
            })
          }
        >
          Read More
        </button>

        {(onEdit || isSuperAdmin) && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                className="px-4 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all"
                onClick={() => onEdit(event)}
              >
                Edit
              </button>
            )}
            {isSuperAdmin && (
              <button
                className="px-4 py-1 bg-gray-200 text-gray-800 text-sm rounded-full hover:bg-gray-300 transition-all"
                onClick={() => onDelete?.(event?.id)}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCards;
