'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function CleanHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NextMovies</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50"
            >
              Home
            </Link>
            <Link 
              href="/movies/popular" 
              className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50"
            >
              Popular
            </Link>
            <Link 
              href="/movies/top-rated" 
              className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50"
            >
              Top Rated
            </Link>
            <Link 
              href="/movies/upcoming" 
              className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-50"
            >
              Upcoming
            </Link>
          </nav>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 rounded-lg transition-all hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 block px-4 py-3 rounded-lg text-base font-medium transition-all hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/movies/popular" 
                className="text-gray-600 hover:text-blue-600 block px-4 py-3 rounded-lg text-base font-medium transition-all hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Popular
              </Link>
              <Link 
                href="/movies/top-rated" 
                className="text-gray-600 hover:text-blue-600 block px-4 py-3 rounded-lg text-base font-medium transition-all hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Top Rated
              </Link>
              <Link 
                href="/movies/upcoming" 
                className="text-gray-600 hover:text-blue-600 block px-4 py-3 rounded-lg text-base font-medium transition-all hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Upcoming
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
