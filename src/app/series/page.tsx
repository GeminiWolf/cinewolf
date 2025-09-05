"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Star, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Navigation from "@/components/Navigation";
import Footer from "@/components/home/Footer";
import { SeriesListService } from "@/service/series.service";
import { SeriesListResponse, Result } from "@/types/series";
import dayjs from "dayjs";

export default function SeriesPage() {
  const [series, setSeries] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [isSearching, setIsSearching] = useState(false);

  const seriesListService = useMemo(() => new SeriesListService(), []);

  const categories = [
    { key: "popular", label: "Popular" },
    { key: "top_rated", label: "Top Rated" },
    { key: "airing_today", label: "Airing Today" },
    { key: "on_the_air", label: "On The Air" },
  ];

  const fetchSeries = useCallback(
    async (category: string, page: number = 1) => {
      try {
        setLoading(true);
        setError(null);
        let data: SeriesListResponse;

        switch (category) {
          case "popular":
            data = await seriesListService.getPopular(page);
            break;
          case "top_rated":
            data = await seriesListService.getTopRated(page);
            break;
          case "airing_today":
            data = await seriesListService.getAiringToday(page);
            break;
          case "on_the_air":
            data = await seriesListService.getOnTheAir(page);
            break;
          default:
            data = await seriesListService.getPopular(page);
        }

        setSeries(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
        setCurrentPage(data.page);
      } catch (err) {
        console.error("Error fetching series:", err);
        setError("Failed to load series");
      } finally {
        setLoading(false);
      }
    },
    [seriesListService]
  );

  const searchSeries = useCallback(
    async (query: string, page: number = 1) => {
      if (!query.trim()) {
        fetchSeries(selectedCategory, page);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setIsSearching(true);
        const data = await seriesListService.searchSeries(query, page);
        setSeries(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
        setCurrentPage(data.page);
      } catch (err) {
        console.error("Error searching series:", err);
        setError("Failed to search series");
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory, fetchSeries, seriesListService]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchSeries(searchQuery, 1);
    } else {
      fetchSeries(selectedCategory, 1);
      setIsSearching(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setIsSearching(false);
    fetchSeries(category, 1);
  };

  const handlePageChange = useCallback(
    (page: number) => {
      if (isSearching) {
        searchSeries(searchQuery, page);
      } else {
        fetchSeries(selectedCategory, page);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [isSearching, searchQuery, selectedCategory, searchSeries, fetchSeries]
  );

  useEffect(() => {
    fetchSeries(selectedCategory);
  }, [fetchSeries, selectedCategory]);

  // Handle browser back button for pagination
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // If we're not on page 1, go to previous page instead of navigating away
      if (currentPage > 1) {
        event.preventDefault();
        handlePageChange(currentPage - 1);
        // Push a new state to prevent the back navigation
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Push initial state to enable back button interception
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentPage, handlePageChange]);

  const getImageUrl = (posterPath: string | null) => {
    if (!posterPath) return "/placeholder-series.jpg";
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  const formatDate = (date: string) => {
    return dayjs(date).format("MMM DD, YYYY");
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            i === currentPage
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  if (loading && series.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading series...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">TV Series</h1>
          <p className="text-gray-400">
            {isSearching
              ? `Search results for "${searchQuery}" (${totalResults} series found)`
              : `Discover ${totalResults} TV series`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search TV series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.key && !isSearching
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{error}</p>
          </div>
        )}

        {/* Series Grid */}
        {!error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {series.map((show) => (
              <Link
                key={show.id}
                href={`/tv/${show.id}`}
                className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-[2/3] relative">
                  <Image
                    src={getImageUrl(show.poster_path)}
                    alt={show.name}
                    fill
                    className="object-cover group-hover:brightness-110 transition-all duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {show.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{show.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(show?.first_air_date)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && renderPagination()}
      </main>

      <Footer />
    </div>
  );
}
