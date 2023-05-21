# Use an official Node.js runtime as a parent image
FROM node:18.16.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY ["package.json", "yarn.lock", "./"]

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Start the application when the container starts
CMD [ "yarn", "start:prod" ]