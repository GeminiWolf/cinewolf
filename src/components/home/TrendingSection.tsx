import React from "react";
import MovieCard from "./MovieCard";
import { Result as TrendingResult } from "@/types/trending";

const TrendingSection = ({
  title,
  trendingShows,
}: {
  title: string;
  trendingShows: TrendingResult[];
}) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingShows.map((show, index) => (
            <MovieCard key={index} movie={show} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
