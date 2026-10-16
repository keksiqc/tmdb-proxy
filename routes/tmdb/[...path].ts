import { defineHandler } from "nitro";
import { getRequestURL, getQuery, HTTPError } from "nitro/h3";

const TMDB_API_URL = "https://api.themoviedb.org/3";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  console.log("Fetching TMDB API", {
    url: getRequestURL(event).href,
    query,
    params: event.context.params,
  });

  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) throw new Error("TMDB API key is not set");

  // Ensure params and path exist
  if (!event.context.params?.path) {
    throw new Error("Path parameter is missing");
  }

  const url = new URL(event.context.params.path as string, `${TMDB_API_URL}/`);
  const params = new URLSearchParams({ language: "en-US" });
  for (const [key, value] of Object.entries(query)) {
    for (const v of [value].flat()) {
      if (v !== undefined) params.set(key, String(v));
    }
  }
  url.search = params.toString();

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new HTTPError({
        status: response.status,
        statusText: response.statusText,
      });
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch TMDB API", {
      url: getRequestURL(event).href,
      query,
      params: event.context.params,
      error,
    });
    throw error;
  }
});
