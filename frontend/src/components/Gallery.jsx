import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios';
import Section from './Section';

function Gallery() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    const gallery = scrollRef.current;
    if (!gallery) return;

    let animationFrameId;
    let speed = 0.8;
    let currentPosition = gallery.scrollLeft;
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (autoScroll) {
        if (timestamp - lastTimestamp >= 16) {
          const maxScroll = gallery.scrollWidth - gallery.offsetWidth;
          currentPosition += speed * scrollDirection;
          
          if (currentPosition >= maxScroll) {
            setScrollDirection(-1);
            currentPosition = maxScroll;
          } else if (currentPosition <= 0) {
            setScrollDirection(1);
            currentPosition = 0;
          }

          gallery.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
          });
          
          lastTimestamp = timestamp;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleWheel = (e) => {
      e.preventDefault();
      gallery.scrollLeft += e.deltaY;
      setAutoScroll(false);
      setTimeout(() => setAutoScroll(true), 4000);
    };

    gallery.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      gallery.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoScroll, scrollDirection]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setAutoScroll(false);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
    setAutoScroll(true);
  };

  return (
    <Section id="gallery" className="py-32">
      <h2 className="text-5xl font-bold mb-16 text-center gradient-text">Gallery</h2>
      <div
        ref={scrollRef}
        className="overflow-x-scroll scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="flex space-x-8 px-8" style={{ width: 'max-content' }}>
          {images.map((image) => (
            <motion.div
              key={image._id}
              className="relative w-[300px] h-[400px] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleClosePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClosePreview}
                className="absolute -top-12 right-0 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Gallery;