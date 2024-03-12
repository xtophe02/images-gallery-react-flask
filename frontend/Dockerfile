# Use an official Node.js runtime as a parent image
FROM node:21-alpine

ARG VITE_FLASK_APP_API_URL

ENV VITE_FLASK_APP_API_URL=$VITE_FLASK_APP_API_URL
# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Set environment variable for production
# ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "run", "dev"]
