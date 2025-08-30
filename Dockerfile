# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL deps (including dev) to allow build
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Remove devDependencies to slim down image
RUN npm prune --production

# Expose port
EXPOSE 4000

# Start the application (compiled JS)
CMD ["npm", "start"]
