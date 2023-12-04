FROM node:20.10 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM caddy:2.4.6
COPY --from=builder /app/dist /app/dist
COPY helpers/Caddyfile /etc/caddy/Caddyfile

EXPOSE 8081
