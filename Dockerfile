# Stage 1: Build application
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY package.json package-lock.json .npmrc* ./

RUN npm ci --prefer-offline --no-audit

COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --prefer-offline --no-audit --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/messages ./messages

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
CMD ["npm", "start"]