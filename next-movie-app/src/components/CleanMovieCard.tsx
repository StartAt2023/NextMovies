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
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
          <Image
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
            onError={(e) => {
              console.error('CleanMovieCard - Image failed to load:', movie.title, getPosterUrl(movie.poster_path));
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onLoad={() => {
              console.log('CleanMovieCard - Image loaded successfully:', movie.title);
            }}
          />
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
