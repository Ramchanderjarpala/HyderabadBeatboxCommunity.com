import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Blog from '../models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env');
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const generateSitemap = async () => {
    console.log('Generating Sitemap...');
    await connectDB();

    try {
        // Fetch only approved blogs
        const blogs = await Blog.find({ status: 'approved' }).select('_id updatedAt');
        const domain = process.env.FRONTEND_URL || 'https://hydbbx.com';

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

        blogs.forEach(blog => {
            xml += `
  <url>
    <loc>${domain}/blog/${blog._id}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
        });

        xml += `
</urlset>`;

        // Path to frontend/public/sitemap.xml
        // scripts -> backend -> root -> frontend -> public
        const sitemapPath = path.join(__dirname, '../../frontend/public/sitemap.xml');

        fs.writeFileSync(sitemapPath, xml);
        console.log(`Sitemap generated successfully at: ${sitemapPath}`);
        console.log(`Total URLs: ${2 + blogs.length}`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

generateSitemap();
