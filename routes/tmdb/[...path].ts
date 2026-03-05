import { defineEventHandler, getRequestURL, getQuery } from "nitro/h3";
import { $fetch } from "ofetch";

const TMDB_API_URL = "https://api.themoviedb.org/3";

export default defineEventHandler(async (event) => {
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

  return await $fetch(event.context.params.path as string, {
    baseURL: TMDB_API_URL,
    params: {
      language: "en-US",
      ...query,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  }).catch((error) => {
    console.error("Failed to fetch TMDB API", {
      url: getRequestURL(event).href,
      query,
      params: event.context.params,
      error,
    });
    throw error;
  });
});
