FROM oven/bun:1.4-alpine@sha256:629e17411f1f129dbec3af78d5af9c9f2a937435c80349437206c6b0b7422373 AS base

FROM base AS deps
WORKDIR /temp/dev
COPY package.json bun.lock ./
RUN bun install --ignore-scripts --frozen-lockfile

FROM base AS builder
WORKDIR /temp/build
COPY --from=deps /temp/dev/node_modules ./node_modules
COPY . .
RUN NITRO_PRESET=bun bun run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /temp/build/.output .

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

USER bun
ENTRYPOINT ["bun"]
CMD ["/app/server/index.mjs"]
