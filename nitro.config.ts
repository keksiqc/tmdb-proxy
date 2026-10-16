import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  compatibilityDate: "2026-03-05",
  serverDir: "./",
  routeRules: {
    "/**": { cors: true, cache: { swr: true, maxAge: 3600, allowQuery: true } },
  },
});
