// Environment configuration
export const config = {
  // TMDB API Configuration
  tmdb: {
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY || '',
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',
  },
  
  
  // App Configuration
  app: {
    name: 'NextMovies',
    description: 'Discover and explore your favorite movies',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Image sizes for TMDB
  imageSizes: {
    poster: {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
      original: 'original',
    },
    backdrop: {
      small: 'w300',
      medium: 'w780',
      large: 'w1280',
      original: 'original',
    },
  },
} as const;

// Validation function to check if required environment variables are set
export const validateConfig = () => {
  const required = [
    'NEXT_PUBLIC_TMDB_API_KEY',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
};
