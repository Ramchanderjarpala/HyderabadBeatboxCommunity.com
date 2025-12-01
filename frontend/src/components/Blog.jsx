import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Section from "./Section";
import LoadingSpinner from "./LoadingSpinner";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs`
        );
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Section id="blog" className="py-16 md:py-32">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-center gradient-text">
          Blog
        </h2>
        <div className="flex justify-center">
          <LoadingSpinner size="large" text="Loading blogs..." />
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section id="blog" className="py-16 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 text-center gradient-text">
            From the Community: Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="bg-[#111] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {blog.title}
                  </h3>
                  <p className="text-white/60 mb-4">By {blog.author}</p>
                  <p className="text-white/80">
                    {blog.content.substring(0, 100)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/write-blog"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors duration-300"
            >
              Write a Blog Post
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

export default Blog;
