# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install all dependencies
COPY server/package*.json ./
RUN npm install

# Copy source code
COPY server/src ./src
COPY server/tsconfig.json ./

# Build the TypeScript code
RUN npm run build

# ---- Stage 2: Production ----
FROM node:20-alpine AS production

WORKDIR /app

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy package files and install ONLY production dependencies
COPY server/package*.json ./
RUN npm install --omit=dev

# Copy the built application from the build stage
COPY --chown=nodejs:nodejs --from=build /app/dist ./dist

# Change ownership of the app directory to the new user
RUN chown -R nodejs:nodejs /app

# Set the non-root user
USER nodejs

# Expose the application port
EXPOSE 5000

# The command to start the application
CMD ["npm", "run", "start"]