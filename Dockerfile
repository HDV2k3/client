# Stage 1: Build Stage
FROM node:20-alpine3.18 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (nếu có) vào container
COPY package*.json ./

# Cài đặt tất cả dependencies
RUN npm ci

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine3.18 as production

# Set working directory
WORKDIR /app

# Copy các file cần thiết từ build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Cài đặt production dependencies (đã cài sẵn trong stage build trước đó)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Mở cổng 3004
EXPOSE 3004

# Chạy ứng dụng
CMD ["npm", "run", "start"]
