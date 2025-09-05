"use client";
import React, { useState, useEffect, use } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/home/Footer";
import DetailHero from "@/components/detail/DetailHero";
import MediaInfo from "@/components/detail/MediaInfo";
import { SeriesService } from "@/service/series.service";
import { TVDetail } from "@/types/seriesDetails";
import { formatDisplayDate, getYearFromDate } from "@/utils/dateUtils";
import Image from "next/image";

export default function TVDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [tvShow, setTvShow] = useState<TVDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tvService = new SeriesService();
    const fetchTVDetail = async () => {
      try {
        console.log("fetching TV detail", resolvedParams.id);
        setLoading(true);
        setError(null);
        const tvData = await tvService.getSeriesDetail(resolvedParams.id);
        setTvShow(tvData);
      } catch (err) {
        console.error("Error fetching TV show details:", err);
        setError("Failed to load TV show details");
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchTVDetail();
    }
  }, [resolvedParams.id]);

  console.log("tvShow", tvShow);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading TV show details...</p>
        </div>
      </div>
    );
  }

  if (error || !tvShow) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-300">{error || "TV show not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <DetailHero media={tvShow} isTV={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MediaInfo media={tvShow} isTV={true} />
          </div>

          <div className="space-y-6">
            {/* TV Show specific content */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Series Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Original Name</span>
                  <span className="text-white">{tvShow.original_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white">{tvShow.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-white">{tvShow.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">In Production</span>
                  <span className="text-white">
                    {tvShow.in_production ? "Yes" : "No"}
                  </span>
                </div>
                {tvShow.last_air_date && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Air Date</span>
                    <span className="text-white">
                      {formatDisplayDate(tvShow?.last_air_date.toString())}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Networks */}
            {tvShow.networks && tvShow.networks.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Networks</h3>
                <div className="space-y-2">
                  {tvShow.networks.map((network) => (
                    <div
                      key={network.id}
                      className="flex items-center space-x-3"
                    >
                      {network.logo_path && (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                          alt={network.name}
                          fill
                          className="w-8 h-8 object-contain"
                        />
                      )}
                      <span className="text-white">{network.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seasons */}
            {tvShow.seasons && tvShow.seasons.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Seasons</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {tvShow.seasons.map((season) => (
                    <div
                      key={season.id}
                      className="flex items-center space-x-3 p-2 rounded bg-gray-800/30"
                    >
                      <div className="w-12 h-16 bg-gray-700 rounded flex-shrink-0">
                        {season.poster_path && (
                          <Image
                            src={`https://image.tmdb.org/t/p/w92${season.poster_path}`}
                            alt={season.name}
                            className="w-full h-full object-cover rounded"
                            fill
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">
                          {season.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {season.episode_count} episodes
                        </p>
                        {season.air_date && (
                          <p className="text-gray-400 text-xs">
                            {getYearFromDate(season.air_date.toString())}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
