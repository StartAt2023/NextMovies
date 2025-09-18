'use client';

import { useEffect, useState } from 'react';
import { TMDBService } from '@/services/tmdb';
import SearchBar from '@/components/SearchBar';
import CleanMovieCard from '@/components/CleanMovieCard';
import CleanHeader from '@/components/CleanHeader';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'popular' | 'search'>('popular');


  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await TMDBService.getPopularMovies();
        setPopularMovies(response.results);
      } catch (err: any) {
        console.error('Error loading movies:', err);
        setError(err.message || 'Failed to load movies');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setActiveTab('popular');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await TMDBService.searchMovies(query);
      setSearchResults(response.results);
      setActiveTab('search');
    } catch (err: any) {
      setError(err.message || 'Failed to search movies');
    } finally {
      setIsLoading(false);
    }
  };

  const currentMovies = activeTab === 'search' ? searchResults : popularMovies;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 text-xl font-medium">Loading movies...</p>
          <p className="text-sm text-gray-500 mt-3">Movies loaded: {popularMovies.length}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-red-600 text-3xl">⚠️</span>
          </div>
          <p className="text-red-600 text-xl font-medium">Error: {error}</p>
          <p className="text-sm text-gray-500 mt-3">Movies loaded: {popularMovies.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CleanHeader />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Discover Amazing Movies
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore popular films, search for your favorites, and discover new cinematic experiences
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-3xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {activeTab === 'search' ? 'Search Results' : 'Popular Movies'}
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              {currentMovies.length} movies found
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'popular'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Popular ({popularMovies.length})
            </button>
            {searchQuery && (
              <button
                onClick={() => setActiveTab('search')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'search'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Search ({searchResults.length})
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
          {currentMovies.map((movie, index) => (
            <CleanMovieCard
              key={movie.id}
              movie={movie}
              priority={index < 4}
            />
          ))}
        </div>
        
        {currentMovies.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-gray-400 text-5xl">🎬</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No movies found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              {searchQuery ? 'Try adjusting your search terms' : 'Check back later for new releases'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}