# Stage 1: Build application
FROM node:20-alpine3.18 as builder

WORKDIR /app

# Sao chép file package.json và package-lock.json trước để cache layer
COPY package*.json ./

# Cài đặt dependencies và build ứng dụng
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production-ready image
FROM node:20-alpine3.18

WORKDIR /app

# Sao chép build output từ stage 1
COPY --from=builder /app ./

COPY .env.local .env.local 

# Expose port
EXPOSE 3000


# Khởi động ứng dụng
CMD ["npm", "run", "start"]
