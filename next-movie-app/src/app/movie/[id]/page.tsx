'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, Bookmark, Star, Calendar, Clock, DollarSign, Users } from 'lucide-react';
import { TMDBService, getBackdropUrl, getPosterUrl } from '@/services/tmdb';
import { useUserStore } from '@/stores/userStore';
import { useMovieStore } from '@/stores/movieStore';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import type { MovieDetails } from '@/types';

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = parseInt(params.id as string);
  
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toggleFavorite, toggleWatchlist, isFavorite, isInWatchlist } = useUserStore();
  const { setSimilarMovies: setStoreSimilarMovies } = useMovieStore();

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [details, similar] = await Promise.all([
          TMDBService.getMovieDetails(movieId),
          TMDBService.getSimilarMovies(movieId)
        ]);
        
        setMovieDetails(details);
        setSimilarMovies(similar.results.slice(0, 6));
        setStoreSimilarMovies(similar.results);
      } catch (err: any) {
        setError(err.message || 'Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      loadMovieDetails();
    }
  }, [movieId, setStoreSimilarMovies]);

  const handleFavorite = () => {
    toggleFavorite(movieId);
  };

  const handleWatchlist = () => {
    toggleWatchlist(movieId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !movieDetails) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Movie not found'}
            </h1>
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={getBackdropUrl(movieDetails.backdrop_path)}
          alt={movieDetails.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={getPosterUrl(movieDetails.poster_path, 'large')}
                  alt={movieDetails.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  {movieDetails.title}
                </h1>
                
                {movieDetails.tagline && (
                  <p className="text-lg text-gray-300 mb-4 italic">
                    "{movieDetails.tagline}"
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{movieDetails.vote_average.toFixed(1)}</span>
                    <span className="text-gray-300 ml-1">({movieDetails.vote_count} votes)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-5 h-5 mr-1" />
                    {new Date(movieDetails.release_date).getFullYear()}
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-1" />
                    {formatRuntime(movieDetails.runtime)}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {movieDetails.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleFavorite}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isFavorite(movieId)
                        ? 'bg-red-600 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isFavorite(movieId) ? 'fill-current' : ''}`} />
                    {isFavorite(movieId) ? 'Favorited' : 'Add to Favorites'}
                  </button>
                  
                  <button
                    onClick={handleWatchlist}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isInWatchlist(movieId)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 mr-2 ${isInWatchlist(movieId) ? 'fill-current' : ''}`} />
                    {isInWatchlist(movieId) ? 'In Watchlist' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movieDetails.overview}
              </p>
            </div>
            
            {/* Similar Movies */}
            {similarMovies.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Similar Movies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {similarMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isFavorite={isFavorite(movie.id)}
                      isInWatchlist={isInWatchlist(movie.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Movie Info
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Release Date</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(movieDetails.release_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                    <p className="text-gray-900 dark:text-white">
                      {movieDetails.budget > 0 ? formatCurrency(movieDetails.budget) : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                    <p className="text-gray-900 dark:text-white">
                      {movieDetails.revenue > 0 ? formatCurrency(movieDetails.revenue) : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className="text-gray-900 dark:text-white">{movieDetails.status}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Production Companies */}
            {movieDetails.production_companies.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Production Companies
                </h3>
                <div className="space-y-2">
                  {movieDetails.production_companies.map((company) => (
                    <p key={company.id} className="text-gray-700 dark:text-gray-300">
                      {company.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

