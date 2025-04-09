# Use node image
FROM node:18

WORKDIR /app

# Copy code and install deps
COPY . .

RUN npm install
RUN npm run build

# Install serve to host the static files
RUN npm install -g serve

# Expose the port serve will use
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build"]
