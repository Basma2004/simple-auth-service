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

RUN chown -R node:node /app
# 6. Security: Don't run as root
USER node

# 7. Add a Health Check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('./src/index.js')"

# 8. Define the startup command
CMD ["node", "src/index.js"]