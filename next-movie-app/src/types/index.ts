// Movie related types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// API Response types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  favorites: number[];
  watchlist: number[];
}

// App state types
export interface AppState {
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGenre: number | null;
  sortBy: 'popularity' | 'rating' | 'release_date';
}

// Component props types
export interface MovieCardProps {
  movie: Movie;
  onFavorite?: (movieId: number) => void;
  onWatchlist?: (movieId: number) => void;
  isFavorite?: boolean;
  isInWatchlist?: boolean;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}
