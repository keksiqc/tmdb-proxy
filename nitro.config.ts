import process from "node:process";
import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  compatibilityDate: "2026-05-06",
  routeRules: {
    "/**": { cors: true },
  },
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || "",
    },
  },
});
