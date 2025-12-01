import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Section from "./Section";
import LoadingSpinner from "./LoadingSpinner";

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`
        );
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Section className="py-16 md:py-32">
        <div className="flex justify-center">
          <LoadingSpinner size="large" text="Loading blog post..." />
        </div>
      </Section>
    );
  }

  if (!blog) {
    return (
      <Section className="py-16 md:py-32">
        <h2 className="text-2xl text-center text-white/80">
          Blog post not found.
        </h2>
      </Section>
    );
  }

  return (
    <Section className="py-16 md:py-32 ">
      <Link to="/" className="text-blue-500 hover:underline p-20">
        &larr; Back to Home
      </Link>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center gradient-text">
            {blog.title}
          </h1>
          <p className="text-center text-white/60 mb-8">
            By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover rounded-lg mb-8"
          />
          <div className="prose prose-invert max-w-none text-white/80 text-lg">
            {blog.content}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default BlogDetail;
