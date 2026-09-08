import { defineHandler } from "nitro";
import { createIPX, createIPXFetchHandler, ipxHttpStorage } from "ipx";

const ipx = createIPX({
  maxAge: 3600,
  alias: {
    "/tmdb": "https://image.tmdb.org/t/p/original/",
    "/youtube": "https://img.youtube.com/",
  },
  storage: ipxHttpStorage({
    domains: ["image.tmdb.org", "img.youtube.com"],
  }),
});

const handler = createIPXFetchHandler(ipx);

export default defineHandler((event) => {
  const request = event.req;
  const url = new URL(request.url);
  url.pathname = url.pathname.replace(/^\/ipx(?=\/|$)/, "");
  return handler(new Request(url, request));
});
