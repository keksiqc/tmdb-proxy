# tmdb-proxy

> This repo is based on [Nuxt Movies Proxy](https://github.com/nuxt/movies/tree/main/proxy).

tmdb-proxy is a lightweight proxy server for the tmdb api and youtube images.

- Speeds up API responses by leveraging the SWR cache.
- Speeds up the development by removing the requirement of having a local token set up.
- Speeds up the performances by optimizing images using [unjs/ipx](https://github.com/unjs/ipx).
- Allows easily deploying the main project to any hosting platform, yet leveraging caching and image optimization.

## Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkeksiqc%2Ftmdb-proxy&env=TMDB_API_KEY&envDescription=Your%20TMDB%20API%20Key&envLink=https%3A%2F%2Fdevelopers.themoviedb.org%2F3%2Fgetting-started%2Fintroduction&project-name=tmdb-proxy&repository-name=tmdb-proxy)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https%3A%2F%2Fgithub.com%2Fkeksiqc%2Ftmdb-proxy#TMDB_API_KEY=)


## Setup

1. Take a copy of `.env.example` and re-name to `.env`
2. Get your [TMDB](https://developers.themoviedb.org/3) API key
3. Enter the details into the `.env` file
4. Start the dev server with the following scripts

``` bash
# Install dependencies
$ bun install

# Start dev server with hot reload at localhost:3001
$ bun dev
```