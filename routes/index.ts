import { defineHandler } from "nitro";

export default defineHandler((event) => {
  event.res.headers.set("Content-Type", "text/html");
  return 'TMDB Proxy: <a href="https://github.com/keksiqc/tmdb-proxy">Learn more</a>';
});
