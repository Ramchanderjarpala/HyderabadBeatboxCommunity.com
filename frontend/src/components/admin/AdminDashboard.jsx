import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import EventsManager from "./EventsManager";
import GalleryManager from "./GalleryManager";
import VideosManager from "./VideosManager";
import HomeImageManager from "./HomeImageManager";
import BlogManager from "./BlogManager";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="events"
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700"
          >
            <h2 className="text-xl text-white">Manage Events</h2>
          </Link>
          <Link
            to="gallery"
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700"
          >
            <h2 className="text-xl text-white">Manage Gallery</h2>
          </Link>
          <Link
            to="videos"
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700"
          >
            <h2 className="text-xl text-white">Manage Videos</h2>
          </Link>
          <Link
            to="home-images"
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700"
          >
            <h2 className="text-xl text-white">Manage Home Images</h2>
          </Link>
          <Link
            to="blogs"
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700"
          >
            <h2 className="text-xl text-white">Manage Blogs</h2>
          </Link>
        </div>

        <Routes>
          <Route path="events" element={<EventsManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="videos" element={<VideosManager />} />
          <Route path="home-images" element={<HomeImageManager />} />
          <Route path="blogs" element={<BlogManager />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
