import withLess from 'next-with-less';
import path from 'path';

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
    return config;
  },
};

export default withLess(nextConfig);
