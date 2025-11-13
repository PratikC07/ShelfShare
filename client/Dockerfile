# ---- Stage 1: Build ----
# Use the same base image as the server for consistency
FROM node:20-alpine AS build

# Set working directory within the build container
WORKDIR /app

# Install dependencies
# Copy package files from the client folder first to leverage Docker cache
# This assumes your build context in docker-compose.yml is the root ('.')
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy the rest of the client source code
COPY client/ ./

# Set build-time argument for the API URL
# This is crucial for Next.js to "bake in" the public URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the Next.js application
RUN npm run build

# ---- Stage 2: Production ----
# Start from a fresh, minimal base image
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user and group for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy only necessary production dependencies config
COPY --chown=nodejs:nodejs client/package.json client/package-lock.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy the built application from the build stage
COPY --chown=nodejs:nodejs --from=build /app/.next ./.next

# Copy public assets and Next.js config
COPY --chown=nodejs:nodejs client/public ./public
COPY --chown=nodejs:nodejs client/next.config.ts ./next.config.ts

# Set the non-root user
USER nodejs

# Expose the application port
EXPOSE 3000

# The command to start the application
# This uses the 'start' script from client/package.json
CMD ["npm", "run", "start"]