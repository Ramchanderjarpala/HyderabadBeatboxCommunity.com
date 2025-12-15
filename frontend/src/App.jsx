import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LuMicVocal } from "react-icons/lu";
import ReactTypingEffect from "react-typing-effect";
import Header from "./components/Header";
import About from "./components/About";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Videos from "./components/Videos";
import Contact from "./components/Contact";
import OurClients from "./components/OurClients";
import Blog from "./components/Blog";
import WriteBlog from "./components/WriteBlog";
import BlogDetail from "./components/BlogDetail";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

function ImageCarousel() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [isCarouselVisible, setIsCarouselVisible] = React.useState(false);

  React.useEffect(() => {
    const localImages = [
      "/home1.webp",
      "/home2.webp",
      "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/IMG_7329.JPG?updatedAt=1764590542631",
      "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/Home%20pics/home3.webp?updatedAt=1764590230088",
      "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/Home%20pics/home4.webp?updatedAt=1764590230634",
      "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/Home%20pics/Home5.webp?updatedAt=1764590230074",
      "https://ik.imagekit.io/qci75z79t/BBx%20Home%20Pics/Home%20pics/Home6.webp?updatedAt=1764590230078"


    ];

    if (localImages.length > 0) {
      const firstImage = new Image();
      firstImage.src = localImages[0];
      firstImage.onload = () => {
        setImages(localImages);
        setIsCarouselVisible(true);
      };
    } else {
      setIsCarouselVisible(true);
    }
  }, []);

  React.useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div id="home" className="relative h-screen overflow-hidden bg-black">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isCarouselVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt="Landscape"
              className="w-full h-full object-cover"
            />
            <div className="hero-gradient absolute inset-0" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8 max-w-5xl mt-80">
          <LuMicVocal className="w-16 h-16 mx-auto mb-6 text-white animate-pulse" />
          <h1 className="text-4xl md:text-8xl font-bold mb-8 text-gradient tracking-tight">
            Hyderabad Beatbox Community
          </h1>
          <p className="text-xl md:text-xl text-white/60 max-w-2xl mx-auto">
            Uniting rhythms, creating beats, building community
          </p>
        </div>
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="bg-black text-white">
      <Header />
      <ImageCarousel />
      <About />
      <Events />
      <Gallery />
      <Videos />
      <OurClients />
      <Blog initialLimit={6} />
      <Contact />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<MainLayout />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/write-blog" element={<WriteBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
