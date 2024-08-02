# Stage 1: Base image
FROM node:20-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force

# Stage 3: Build application
FROM base AS build
WORKDIR /app
COPY --from=dependencies /app /app
COPY . .
RUN npm install && npm run build

# Stage 4: Final image
FROM node:20-alpine AS final
WORKDIR /app
COPY --from=dependencies /app/package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node
EXPOSE 4000
CMD ["node", "dist/main.js"]
