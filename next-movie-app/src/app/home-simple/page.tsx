'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { TMDBService } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';
import Header from '@/components/Header';
import { Loader2, AlertCircle } from 'lucide-react';
import type { Movie } from '@/types';

export default function HomeSimplePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, isInWatchlist } = useUserStore();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await TMDBService.getPopularMovies();
        console.log('Simple Home - Loaded movies:', response.results.length);
        setMovies(response.results);
      } catch (err: any) {
        console.error('Simple Home - Failed to load movies:', err);
        setError(err.message || 'Failed to load movies');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Simple Home Page
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading movies...</span>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                isInWatchlist={isInWatchlist(movie.id)}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
