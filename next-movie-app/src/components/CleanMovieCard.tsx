'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar } from 'lucide-react';
import { getPosterUrl } from '@/services/tmdb';

interface CleanMovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  };
  priority?: boolean;
}

export default function CleanMovieCard({ 
  movie, 
  priority = false
}: CleanMovieCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="relative bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 h-full flex flex-col">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
            onError={(e) => {
              console.error('CleanMovieCard - Image failed to load:', movie.title, getPosterUrl(movie.poster_path));
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Movie Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{formatDate(movie.release_date)}</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
              <span className="font-semibold text-yellow-700 text-xs sm:text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed flex-grow">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
