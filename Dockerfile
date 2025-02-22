FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY package.json yarn.lock .npmrc* ./

COPY ./tsconfig.json ./tsconfig.json

COPY . .

RUN ls -a ./src/entities

RUN npm install --frozen-lockfile --network-timeout 1000000

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "run", "start", "-H", "0.0.0.0", "-p", "3000"]