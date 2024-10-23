// next.config.js
import withLess from 'next-with-less';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.istockphoto.com', 'firebasestorage.googleapis.com', 'storage.googleapis.com','cdn.chotot.com','images.unsplash.com'],
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true, // Cần thiết để hỗ trợ tính năng như override biến Less
    },
  },
  swcMinify: false,
};

export default withLess(nextConfig);
