FROM oven/bun:1.2-alpine AS base
ARG APP_UID=1000 \
    APP_GID=1000

RUN set -ex; \
    mkdir -p /app; \
    chown -R ${APP_UID}:${APP_GID} /app;

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/.output .

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

USER ${APP_UID}:${APP_GID}
ENTRYPOINT ["bun", "/app/server/index.mjs"]
