# Use official Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package files to install dependencies first
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy rest of the app files into the container
COPY . .

# Expose the port your app runs on (e.g., 5000)
EXPOSE 5000

# Start your Node.js app
CMD ["node", "app.js"]
