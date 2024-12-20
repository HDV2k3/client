import withLess from 'next-with-less';
import path from 'path';
import { fileURLToPath } from 'url';

// Định nghĩa __dirname cho ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình hình ảnh cho các domain được phép sử dụng
  images: {
    domains: [
      'media.istockphoto.com', 
      'firebasestorage.googleapis.com', 
      'storage.googleapis.com',
      'cdn.chotot.com',
      'images.unsplash.com'
    ],
  },

  // Cấu hình Less
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true, // Hỗ trợ JavaScript trong Less
    },
  },

  // Tắt SWC Minify vì không được hỗ trợ trong phiên bản này
  swcMinify: false,

  // Thêm alias cho các đường dẫn như @/components hay @/hooks
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname); // Alias @ trỏ đến root của dự án

    // Thêm alias cho các đường dẫn của API từ biến môi trường
    config.resolve.alias['@/service'] = path.resolve(__dirname, 'services');
    
    return config;
  },

  // Cấu hình sử dụng biến môi trường
  env: {
    NEXT_PUBLIC_API_URL_SOCKET: process.env.NEXT_PUBLIC_API_URL_SOCKET,
    NEXT_PUBLIC_API_URL_CHATTING: process.env.NEXT_PUBLIC_API_URL_CHATTING,
    NEXT_PUBLIC_API_URL_MARKETING: process.env.NEXT_PUBLIC_API_URL_MARKETING,
    NEXT_PUBLIC_API_URL_USER: process.env.NEXT_PUBLIC_API_URL_USER,
    NEXT_PUBLIC_API_URL_CHAT_BOT: process.env.NEXT_PUBLIC_API_URL_CHAT_BOT,
  },

  // Cấu hình Experimental
 experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withLess(nextConfig);
