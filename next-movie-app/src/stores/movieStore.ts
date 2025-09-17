import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Movie, MovieDetails, Genre } from '@/types';

interface MovieState {
  // Movies data
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  nowPlayingMovies: Movie[];
  upcomingMovies: Movie[];
  searchResults: Movie[];
  similarMovies: Movie[];
  recommendedMovies: Movie[];
  
  // Movie details
  movieDetails: Record<number, MovieDetails>;
  
  // Genres
  genres: Genre[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGenre: number | null;
  currentPage: number;
  totalPages: number;
  
  // Actions
  setPopularMovies: (movies: Movie[]) => void;
  setTopRatedMovies: (movies: Movie[]) => void;
  setNowPlayingMovies: (movies: Movie[]) => void;
  setUpcomingMovies: (movies: Movie[]) => void;
  setSearchResults: (movies: Movie[]) => void;
  setSimilarMovies: (movies: Movie[]) => void;
  setRecommendedMovies: (movies: Movie[]) => void;
  setMovieDetails: (movieId: number, details: MovieDetails) => void;
  setGenres: (genres: Genre[]) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genreId: number | null) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  
  // Utility actions
  clearSearch: () => void;
  clearError: () => void;
}

export const useMovieStore = create<MovieState>()(
  devtools(
    (set, get) => ({
      // Initial state
      popularMovies: [],
      topRatedMovies: [],
      nowPlayingMovies: [],
      upcomingMovies: [],
      searchResults: [],
      similarMovies: [],
      recommendedMovies: [],
      movieDetails: {},
      genres: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      selectedGenre: null,
      currentPage: 1,
      totalPages: 1,
      
      // Actions
      setPopularMovies: (movies) => set({ popularMovies: movies }),
      setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),
      setNowPlayingMovies: (movies) => set({ nowPlayingMovies: movies }),
      setUpcomingMovies: (movies) => set({ upcomingMovies: movies }),
      setSearchResults: (movies) => set({ searchResults: movies }),
      setSimilarMovies: (movies) => set({ similarMovies: movies }),
      setRecommendedMovies: (movies) => set({ recommendedMovies: movies }),
      setMovieDetails: (movieId, details) => 
        set((state) => ({
          movieDetails: { ...state.movieDetails, [movieId]: details }
        })),
      setGenres: (genres) => set({ genres }),
      
      // UI actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedGenre: (genreId) => set({ selectedGenre: genreId }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setTotalPages: (pages) => set({ totalPages: pages }),
      
      // Utility actions
      clearSearch: () => set({ 
        searchResults: [], 
        searchQuery: '', 
        selectedGenre: null,
        currentPage: 1 
      }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'movie-store',
    }
  )
);
