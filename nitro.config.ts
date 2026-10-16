import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  compatibilityDate: "2026-03-05",
  serverDir: "./",
  routeRules: {
    "/**": {
      cors: true,
      cache: { swr: true, maxAge: 3600, allowQuery: true },
      // Vercel maps `cache.swr` to ISR, which drops the query string unless `passQuery` is set
      isr: { expiration: 3600, passQuery: true },
    },
  },
});
