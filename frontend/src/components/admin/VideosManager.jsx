import React, { useState, useEffect } from "react";
import axios from "axios";

function VideosManager() {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({
    url: "",
    title: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos`
      );
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos`,
        newVideo,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchVideos();
      setNewVideo({ url: "", title: "" });
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/videos/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={newVideo.url}
          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
          placeholder="YouTube URL"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          placeholder="Video Title"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Video
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video._id} className="bg-gray-800 p-4 rounded">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-white mt-2">{video.title}</h3>
            <button
              onClick={() => handleDelete(video._id)}
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

export default VideosManager;
