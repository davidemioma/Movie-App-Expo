const TMDB_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY || "",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

export const fetchmovies = async ({ query }: { query?: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.baseUrl}/discover/movie?page=1&sort_by=popularity.desc`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movies: " + res.statusText);
  }

  const data = await res.json();

  return data.results;
};

export const fetchMovieDetail = async ({ movieId }: { movieId: string }) => {
  try {
    const res = await fetch(
      `${TMDB_CONFIG.baseUrl}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movie details: " + res.statusText);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("fetchMovieDetail Error:", err);

    throw err;
  }
};
