FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application files
COPY . .

# Expose the application port
EXPOSE 6007

# Command to run the application
CMD ["node", "src/server.js"]