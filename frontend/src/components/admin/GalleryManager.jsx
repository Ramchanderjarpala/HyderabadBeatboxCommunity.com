import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GalleryManager() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    file: null,
    title: ''
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/gallery');
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage({ ...newImage, file: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/gallery', {
        image: newImage.file,
        title: newImage.title
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchImages();
      setNewImage({ file: null, title: '' });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          value={newImage.title}
          onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
          placeholder="Image Title"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload Image
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image._id} className="bg-gray-800 p-4 rounded">
            <img src={image.image} alt={image.title} className="w-full h-48 object-cover rounded" />
            <p className="text-white mt-2">{image.title}</p>
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

export default GalleryManager