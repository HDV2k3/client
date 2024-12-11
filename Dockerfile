FROM node:20-alpine3.18 as builder

WORKDIR /app

# Sao chép file package.json và package-lock.json trước để cache layer
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Expose port
EXPOSE 3001

# Khởi động ứng dụng
CMD ["npm", "run", "start"]
