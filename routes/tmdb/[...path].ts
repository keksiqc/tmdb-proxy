const TMDB_API_URL = "https://api.themoviedb.org/3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  console.log("Fetching TMDB API", {
    url: getRequestURL(event).href,
    query,
    params: event.context.params,
  });
  const config = useRuntimeConfig();
  if (!config.tmdb.apiKey) throw new Error("TMDB API key is not set");

  // Ensure params and path exist
  if (!event.context.params?.path) {
    throw new Error("Path parameter is missing");
  }

  try {
    return await $fetch(event.context.params.path as string, {
      baseURL: TMDB_API_URL,
      params: {
        api_key: config.tmdb.apiKey,
        language: "en-US",
        ...query,
      },
      headers: {
        Accept: "application/json",
      },
    });
    // biome-ignore lint/suspicious/noExplicitAny: any is fine here
  } catch (e: any) {
    const status = e?.response?.status || 500;
    setResponseStatus(event, status);
    return {
      error: String(e)?.replace(config.tmdb.apiKey, "***"),
    };
  }
});
