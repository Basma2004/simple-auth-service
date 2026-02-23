# 1. Use a small base image
FROM node:18-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Optimization: Copy dependency files first to use Cache
COPY package*.json ./

# 4. Install dependencies
RUN npm ci --only=production

# 5. Copy the rest of the application code
COPY . .

# 6. Security: Don't run as root
USER node

# 7. Add a Health Check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "try { require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1)) } catch (e) { process.exit(1) }"

# 8. Define the startup command
CMD ["node", "src/index.js"]