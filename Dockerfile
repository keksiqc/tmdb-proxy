ARG APP_UID=1000 \
    APP_GID=1000

FROM oven/bun:1.2-alpine AS base
USER root
RUN set -ex; \
    apk --no-cache --update upgrade; \
    addgroup --gid ${APP_GID} -S docker; \
    adduser --uid ${APP_UID} -D -S -s /sbin/nologin -G docker docker;

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
ENV PORT 3000

USER 1000:1000
ENTRYPOINT ["bun"]
CMD ["/app/server/index.mjs"]
