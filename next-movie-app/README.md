# NextMovies - Movie Discovery App

A modern, full-featured movie discovery application built with Next.js 15, TypeScript, Tailwind CSS, Zustand, and TMDB API. Features include user authentication, movie search, favorites, watchlist, and responsive design.

## 🚀 Features

- **Movie Discovery**: Browse popular, top-rated, and upcoming movies
- **Search Functionality**: Search movies by title with real-time results
- **User Authentication**: Sign up/Sign in with email or Google OAuth
- **Personal Lists**: Add movies to favorites and watchlist
- **Movie Details**: Detailed movie information with similar recommendations
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Built-in dark/light theme support
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **API**: The Movie Database (TMDB) API
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- A TMDB API key (free at [themoviedb.org](https://www.themoviedb.org/settings/api))
- A Firebase project (optional, for authentication)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd next-movie-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:
```bash
cp env.example .env.local
```

Fill in your environment variables in `.env.local`:

```env
# Required: TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# Optional: Firebase Configuration (for authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Get TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/settings/api)
2. Create an account (free)
3. Request an API key
4. Copy the API key to your `.env.local` file

### 5. Firebase Setup (Optional)

If you want to enable authentication:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and add Email/Password and Google providers
4. Copy the config values to your `.env.local` file

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── movie/[id]/        # Dynamic movie detail pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── MovieCard.tsx      # Movie card component
│   ├── SearchBar.tsx      # Search input component
│   └── Header.tsx         # Navigation header
├── hooks/                 # Custom React hooks
│   └── useAuth.ts         # Authentication hook
├── lib/                   # Utility libraries
│   ├── config.ts          # App configuration
│   ├── firebase.ts        # Firebase setup
│   └── supabase.ts        # Supabase setup (alternative)
├── services/              # API services
│   └── tmdb.ts            # TMDB API service
├── stores/                # Zustand state stores
│   ├── movieStore.ts      # Movie data store
│   └── userStore.ts       # User data store
└── types/                 # TypeScript type definitions
    └── index.ts           # Shared types
```

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize the design by:
- Modifying the color scheme in `tailwind.config.js`
- Updating component styles in the component files
- Adding custom CSS in `globals.css`

### Adding New Features
- **New Pages**: Add new routes in the `app/` directory
- **New Components**: Create reusable components in `components/`
- **New API Endpoints**: Add API routes in `app/api/`
- **State Management**: Extend Zustand stores in `stores/`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_TMDB_API_KEY`
- `NEXT_PUBLIC_FIREBASE_*` (if using Firebase)
- `NEXT_PUBLIC_APP_URL`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Features Overview

### Home Page
- Displays popular movies
- Search functionality
- Responsive grid layout
- Dark/light mode support

### Movie Details
- Full movie information
- Similar movies recommendations
- Add to favorites/watchlist
- Responsive design

### Authentication
- Email/password sign up/in
- Google OAuth integration
- Protected routes
- User profile management

### User Features
- Personal favorites list
- Watchlist management
- Persistent data storage
- Cross-device synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for authentication services
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/your-username/next-movies/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainers

---

**Happy coding! 🎬✨**