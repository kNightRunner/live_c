# ---------- base: dependencies + source ----------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# ---------- test: run jest ----------
FROM base AS test
CMD ["npm", "test"]

# ---------- build: compile TypeScript and keep only prod deps ----------
FROM base AS build
RUN npm run build
RUN npm ci --omit=dev

# ---------- production: lightweight runtime ----------
FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 4000
CMD ["npm", "start"]
