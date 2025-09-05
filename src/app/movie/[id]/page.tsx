"use client";
import React, { useState, useEffect, use } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/home/Footer";
import DetailHero from "@/components/detail/DetailHero";
import MediaInfo from "@/components/detail/MediaInfo";
import { MovieService } from "@/service/movie.service";
import { MovieDetail } from "@/types/movieDetail";

export default function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const movieService = new MovieService();
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await movieService.getMovieDetail(resolvedParams.id);
        setMovie(movieData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchMovieDetail();
    }
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-300">{error || "Movie not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <DetailHero media={movie} isTV={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MediaInfo media={movie} isTV={false} />
          </div>

          <div className="space-y-6">
            {/* Additional content can be added here */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Original Title</span>
                  <span className="text-white">{movie.original_title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Original Language</span>
                  <span className="text-white">
                    {movie.original_language.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Popularity</span>
                  <span className="text-white">
                    {movie.popularity.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
