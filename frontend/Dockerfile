# Dockerfile Template Nodejs For Vue
FROM node:lts-alpine

# Stage 1 : Install All Depedency
# Install all depedency from package.json
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci 
RUN npm install

# Stage 2 : Building Application
# Copy all file for building apps
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV PROD=true
ENV CONTAINER_RUNNER=true
RUN npm run build

# Stage 3 : Production Server
# Copy and running as image container (Production)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g http-server
COPY --from=build /app/dist ./dist

# Running
EXPOSE 8080
CMD ["http-server", "dist"]