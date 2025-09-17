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

  console.log('Home page - Component rendered, state:', { 
    popularMoviesCount: popularMovies.length,
    searchResultsCount: searchResults.length,
    isLoading, 
    error,
    searchQuery,
    activeTab
  });

  useEffect(() => {
    console.log('Home page - useEffect triggered');
    
    const loadMovies = async () => {
      try {
        console.log('Home page - Starting to load movies...');
        setIsLoading(true);
        setError(null);
        
        const response = await TMDBService.getPopularMovies();
        console.log('Home page - API response:', response);
        console.log('Home page - Movies count:', response.results.length);
        
        setPopularMovies(response.results);
        console.log('Home page - Popular movies set in state');
      } catch (err: any) {
        console.error('Home page - Error loading movies:', err);
        setError(err.message || 'Failed to load movies');
      } finally {
        console.log('Home page - Setting loading to false');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
          <p className="text-sm text-gray-500 mt-2">Movies loaded: {popularMovies.length}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error: {error}</p>
          <p className="text-sm text-gray-500 mt-2">Movies loaded: {popularMovies.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CleanHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          NextMovies - {currentMovies.length} Movies
        </h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'popular'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Popular Movies ({popularMovies.length})
          </button>
          {searchQuery && (
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Search Results ({searchResults.length})
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentMovies.map((movie, index) => (
            <CleanMovieCard
              key={movie.id}
              movie={movie}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}