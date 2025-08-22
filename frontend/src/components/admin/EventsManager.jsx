import React, { useState, useEffect } from "react";
import axios from "axios";

function EventsManager() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    details: "",
    location: "",
  });
  const [imageBase64, setImageBase64] = useState("");

  // Handle file selection and convert to base64 encoded string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImageBase64(reader.result);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`
      );
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`,
        {
          ...newEvent,
          details: newEvent.details
            .split("\n")
            .map((d) => d.trim())
            .filter((d) => d.length > 0),
          image: imageBase64,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEvents();
      setNewEvent({
        title: "",
        date: "",
        description: "",
        details: "",
        location: "",
      });
      setImageBase64("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Removed duplicate useEffect and handleSubmit definitions

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Event Title"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <div>
          <label>Event Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <input
          type="text"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          placeholder="Event Date"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <textarea
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          placeholder="Description"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <textarea
          value={newEvent.details}
          onChange={(e) =>
            setNewEvent({ ...newEvent, details: e.target.value })
          }
          placeholder="Details (one per line)"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          value={newEvent.location}
          onChange={(e) =>
            setNewEvent({ ...newEvent, location: e.target.value })
          }
          placeholder="Location"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </form>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="bg-gray-800 p-4 rounded">
            <h3 className="text-xl text-white">{event.title}</h3>
            <p className="text-gray-300">{event.date}</p>
            <button
              onClick={() => handleDelete(event._id)}
              className="bg-red-600 text-white px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsManager;
