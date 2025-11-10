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

# Copy package files and install ONLY production dependencies
COPY server/package*.json ./
RUN npm install --omit=dev

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the application port
EXPOSE 5000

# The command to start the application
CMD ["npm", "run", "start"]