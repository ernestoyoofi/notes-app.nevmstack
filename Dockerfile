# Setup Base Image
FROM nginx:alpine AS webserver
FROM node:lts-alpine AS base

# Install Dependency On Backend
FROM base AS backend

WORKDIR /app

COPY ./backend/ ./
RUN npm install

# Install Dependency On Frontend & Build Frontend
FROM base AS frontend

WORKDIR /app

COPY ./frontend/ ./
RUN npm install
RUN npm run build

# Server
FROM webserver AS prod

WORKDIR /app

COPY --from=frontend /app/dist/ /usr/share/nginx/html
COPY --from=backend /app/ /app/
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN apk add nodejs
RUN rm -rf /var/cache/apk/*

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]