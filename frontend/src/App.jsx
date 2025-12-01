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
import axios from "axios";

function ImageCarousel() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/home-images`
        );
        setImages(data.map((image) => image.image));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  React.useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
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
      <Blog />
      <Contact />
      {/* <footer className="glass-effect py-8 px-4 text-center text-sm text-white/60">
        <p>© 2024 Hyderabad Beatbox Community. All rights reserved.</p>
        <div className="text-center text-white/40 text-[10px]">
          <ReactTypingEffect
            text={["Developed by X Boy"]}
            speed={100}
            eraseDelay={2000}
            typingDelay={1000}
            cursorRenderer={(cursor) => <span>{cursor}</span>}
          />
        </div>
      </footer> */}
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
