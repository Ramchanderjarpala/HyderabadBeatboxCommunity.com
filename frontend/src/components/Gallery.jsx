import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "./Section";
import LoadingSpinner from "./LoadingSpinner";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { X } from "lucide-react";
import "./Gallery.css";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery`
      );
      const formattedImages = data.map((image) => ({
        original: image.image,
        thumbnail: image.image,
        description: image.title,
      }));
      setImages(formattedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Section id="gallery" className="py-16 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-center gradient-text">
          Gallery
        </h2>
        <div className="flex justify-center">
          <LoadingSpinner size="large" text="Loading gallery..." />
        </div>
      </Section>
    );
  }

  const visibleImages = images.slice(0, 9);

  return (
    <Section id="gallery" className="py-16 md:py-32">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-center gradient-text">
        Gallery
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 p-4">
        {visibleImages.map((image, index) => (
          <div
            key={index}
            className="aspect-w-1 aspect-h-1 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.original}
              alt={image.description}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
      {images.length > 9 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowGallery(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            View More
          </button>
        </div>
      )}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 gallery-modal">
          <div className="relative w-full h-full max-h-screen">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-0 right-0 m-4 text-white z-10"
            >
              <X size={32} />
            </button>
            <ImageGallery
              items={images}
              thumbnailPosition="bottom"
              showPlayButton={false}
            />
          </div>
        </div>
      )}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-screen p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 m-4 text-white"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.original}
              alt={selectedImage.description}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </Section>
  );
}

export default Gallery;
