import React, { useState, useEffect } from "react";
import axios from "axios";

function HomeImageManager() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/home-images`
      );
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/home-images`,
        {
          image: newImage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchImages();
      setNewImage("");
    } catch (error) {
      console.error("Error creating home image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/home-images/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Image
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image._id} className="bg-gray-800 p-4 rounded">
            <img
              src={image.image}
              alt="Home Image"
              className="w-full h-48 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(image._id)}
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

export default HomeImageManager;
