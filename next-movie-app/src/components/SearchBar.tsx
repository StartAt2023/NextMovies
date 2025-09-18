'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import type { SearchBarProps } from '@/types';

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search movies...", 
  className = "" 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Optional: Search as user types (debounced)
    if (value.trim() === '') {
      onSearch('');
    }
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="block w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm hover:shadow-md text-base sm:text-lg"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
      
      <button
        type="submit"
        className="mt-3 sm:mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-base sm:text-lg"
      >
        Search Movies
      </button>
    </form>
  );
}


