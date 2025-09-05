"use client";
import React, { useState, useEffect } from "react";

import Navigation from "../components/Navigation";
import HeroSection from "@/components/home/HeroSection";
import TrendingSection from "@/components/home/TrendingSection";
import Footer from "@/components/home/Footer";
import { TrendingService } from "@/service/trending.service";
import { Result as TrendingResult } from "@/types/trending";

export default function LandingPage() {
  const trendingService = new TrendingService();

  const [trendingMovies, setTrendingMovies] = useState<TrendingResult[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<TrendingResult[]>([]);

  const fetchTrendingMovies = async () => {
    const trendingMovies = await trendingService.getTrendingMovies();
    setTrendingMovies(trendingMovies.results);
  };

  const fetchTrendingSeries = async () => {
    const trendingSeries = await trendingService.getTrendingSeries();
    setTrendingSeries(trendingSeries.results);
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchTrendingSeries();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />
      <HeroSection />
      <TrendingSection
        title="Trending Movies"
        trendingShows={trendingMovies || []}
      />
      <TrendingSection
        title="Trending Series"
        trendingShows={trendingSeries || []}
      />
      <Footer />
    </div>
  );
}
