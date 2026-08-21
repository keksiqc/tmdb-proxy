FROM oven/bun:1.4-alpine@sha256:07235578f79ef8c6f97d94aee7938e76f5cdba5f21ae5dbfdd3d3d38058437eb AS base

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
