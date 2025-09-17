import axios from 'axios';
import { config } from '@/lib/config';
import type { Movie, MovieDetails, TMDBResponse, Genre } from '@/types';

// Create axios instance with base configuration
const tmdbApi = axios.create({
  baseURL: config.tmdb.baseUrl,
  params: {
    api_key: config.tmdb.apiKey,
  },
});

// TMDB API Service
export class TMDBService {
  // Get popular movies
  static async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  }

  // Get top rated movies
  static async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page },
    });
    return response.data;
  }

  // Get now playing movies
  static async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  }

  // Get upcoming movies
  static async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page },
    });
    return response.data;
  }

  // Search movies
  static async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get('/search/movie', {
      params: { 
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  }

  // Get movie details
  static async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,reviews,similar',
      },
    });
    return response.data;
  }

  // Get movies by genre
  static async getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data;
  }

  // Get all genres
  static async getGenres(): Promise<{ genres: Genre[] }> {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data;
  }

  // Get similar movies
  static async getSimilarMovies(movieId: number, page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`, {
      params: { page },
    });
    return response.data;
  }

  // Get recommended movies
  static async getRecommendedMovies(movieId: number, page: number = 1): Promise<TMDBResponse<Movie>> {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`, {
      params: { page },
    });
    return response.data;
  }
}

// Utility functions for image URLs
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.svg';
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.tmdb.imageBaseUrl}/${size}${cleanPath}`;
};

export const getPosterUrl = (path: string | null, size: keyof typeof config.imageSizes.poster = 'medium'): string => {
  return getImageUrl(path, config.imageSizes.poster[size]);
};

export const getBackdropUrl = (path: string | null, size: keyof typeof config.imageSizes.backdrop = 'large'): string => {
  return getImageUrl(path, config.imageSizes.backdrop[size]);
};
