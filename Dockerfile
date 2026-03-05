FROM oven/bun:1.3-alpine@sha256:32f1fcccb1523960b254c4f80973bee1a910d60be000a45c20c9129a1efcffee AS base

FROM base AS deps
WORKDIR /temp/dev
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /temp/build
COPY --from=deps /temp/dev/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /temp/build/.output .

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

USER bun
ENTRYPOINT ["bun"]
CMD ["/app/server/index.mjs"]
