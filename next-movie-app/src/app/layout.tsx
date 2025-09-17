import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextMovies - Discover Your Favorite Movies",
  description: "A modern movie discovery app built with Next.js, featuring popular movies, search functionality, and personalized favorites.",
  keywords: "movies, film, entertainment, discovery, TMDB",
  authors: [{ name: "NextMovies Team" }],
  openGraph: {
    title: "NextMovies - Discover Your Favorite Movies",
    description: "A modern movie discovery app built with Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        {children}
      </body>
    </html>
  );
}
