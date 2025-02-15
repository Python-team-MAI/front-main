FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
RUN apk add --no-cache ca-certificates

COPY package.json yarn.lock .npmrc* ./

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 \
    yarn install --frozen-lockfile --network-timeout 1000000

COPY . .

RUN yarn build

FROM node:20-alpine AS production

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/src ./src

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
CMD ["yarn", "start"]