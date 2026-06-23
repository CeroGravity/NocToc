import "server-only";
import type { Movie, TMDBListResponse, VideosResponse } from "@/types/tmdb";

export { tmdbImage } from "./images";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

export const isTmdbConfigured = Boolean(API_KEY);

async function tmdbFetch<T>(
  endpoint: string,
  revalidate = 60 * 60 * 24
): Promise<T> {
  if (!API_KEY) throw new Error("TMDB_API_KEY is not set");
  const sep = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${sep}api_key=${API_KEY}&language=en-US`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) throw new Error(`TMDB ${res.status} for ${endpoint}`);
  return res.json() as Promise<T>;
}

async function fetchList(endpoint: string): Promise<Movie[]> {
  const data = await tmdbFetch<TMDBListResponse>(endpoint);
  return data.results;
}

export const tmdb = {
  trending: () => fetchList("/trending/all/week"),
  trendingTv: () => fetchList("/trending/tv/week"),
  netflixOriginals: () => fetchList("/discover/tv?with_networks=213"),
  topRated: () => fetchList("/movie/top_rated"),
  popularMovies: () => fetchList("/movie/popular"),
  upcoming: () => fetchList("/movie/upcoming"),
  nowPlaying: () => fetchList("/movie/now_playing"),
  popularTv: () => fetchList("/tv/popular"),
  topRatedTv: () => fetchList("/tv/top_rated"),
  onTheAir: () => fetchList("/tv/on_the_air"),
  action: () => fetchList("/discover/movie?with_genres=28"),
  comedy: () => fetchList("/discover/movie?with_genres=35"),
  horror: () => fetchList("/discover/movie?with_genres=27"),
  romance: () => fetchList("/discover/movie?with_genres=10749"),
  documentaries: () => fetchList("/discover/movie?with_genres=99"),
  videos: (id: number, mediaType: "movie" | "tv" = "movie") =>
    tmdbFetch<VideosResponse>(`/${mediaType}/${id}/videos`),
  details: (id: number, mediaType: "movie" | "tv" = "movie") =>
    tmdbFetch<Movie>(`/${mediaType}/${id}`),
};
