const TMDB_API_URL = "https://api.themoviedb.org/3";

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event);
  // eslint-disable-next-line no-console
  console.log("Fetching TMDB API", {
    url: getRequestURL(event).href,
    query,
    params: event.context.params,
  });
  const config = useRuntimeConfig();
  if (!config.tmdb.apiKey) throw new Error("TMDB API key is not set");
  try {
    return await $fetch(event.context.params!.path, {
      baseURL: TMDB_API_URL,
      params: {
        language: "en-US",
        ...query,
      },
      headers: {
        Accept: "application/json",
         Authorization: `Bearer ${config.tmdb.apiKey}`,
      },
    });
  } catch (e: any) {
    const status = e?.response?.status || 500;
    setResponseStatus(event, status);
    return {
      error: String(e)?.replace(config.tmdb.apiKey, "***"),
    };
  }
}, {
  maxAge: 3600,
  getKey: (event) => {
    const url = getRequestURL(event);
    return url.pathname + url.search;
  },
});
