FROM oven/bun:1.4-alpine@sha256:d888c0ae6c86d7866ff10c5aafdd9077b36aee6455b33dd270fb93c0dd5cef6f AS base

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
