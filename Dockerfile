FROM oven/bun:1.3-alpine@sha256:4de475389889577f346c636f956b42a5c31501b654664e9ae5726f94d7bb5349 AS base

FROM base AS deps
WORKDIR /temp/dev
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

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
