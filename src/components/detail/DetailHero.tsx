import React, { useState } from "react";
import { Play, Star, Calendar, Clock, Globe, Plus, Share2 } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";

import { MediaService } from "@/service/media.service";
import { MovieDetail } from "@/types/movieDetail";
import TrailerModal from "./TrailerModal";
import { TVDetail } from "@/types/seriesDetails";
import { VideoResult } from "@/types/media";

interface DetailHeroProps {
  media: MovieDetail | TVDetail;
  isTV?: boolean;
}

const DetailHero: React.FC<DetailHeroProps> = ({ media, isTV = false }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const mediaService = new MediaService();

  const getBackdropUrl = () => {
    return mediaService.getPathImage(media.backdrop_path, "original");
  };

  const getTrailer = (): VideoResult | null => {
    if (media?.videos?.results) {
      return (
        media.videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        ) ||
        media.videos.results[0] ||
        null
      );
    }
    return null;
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getReleaseDate = () => {
    if (isTV && "first_air_date" in media) {
      return media.first_air_date;
    }
    if ("release_date" in media) {
      return media.release_date;
    }
    return "";
  };

  const getTitle = () => {
    if (isTV && "name" in media) {
      return media.name;
    }
    if ("title" in media) {
      return media.title;
    }
    return "";
  };

  const getRuntime = () => {
    if (
      isTV &&
      "episode_run_time" in media &&
      media.episode_run_time.length > 0
    ) {
      return formatRuntime(media.episode_run_time[0]);
    }
    if ("runtime" in media && media.runtime) {
      return formatRuntime(media.runtime);
    }
    return null;
  };

  const trailer = getTrailer();

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl()}
            alt={getTitle()}
            fill
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-purple-600/30 backdrop-blur-lg rounded-full text-sm font-medium">
                  {isTV ? "TV Series" : "Featured Movie"}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {getTitle()}
                </h1>

                {media.tagline && (
                  <p className="text-xl text-gray-300 italic">
                    {media.tagline}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <span className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span>{media.vote_average.toFixed(1)}</span>
                  </span>

                  {getReleaseDate() && (
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{dayjs(getReleaseDate()).format("YYYY")}</span>
                    </span>
                  )}

                  {getRuntime() && (
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{getRuntime()}</span>
                    </span>
                  )}

                  {isTV && "number_of_seasons" in media && (
                    <span className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>
                        {media.number_of_seasons} Season
                        {media.number_of_seasons !== 1 ? "s" : ""}
                      </span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {media.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm border border-gray-700"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                  {media.overview}
                </p>

                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <button
                      onClick={() => setIsTrailerOpen(true)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Watch Trailer</span>
                    </button>
                  )}

                  <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Add to Watchlist</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Poster */}
              <div className="hidden lg:block">
                <div className="relative w-80 h-[500px] mx-auto">
                  <Image
                    src={mediaService.getPathImage(media.poster_path, "w500")}
                    alt={getTitle()}
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailer={trailer}
      />
    </>
  );
};

export default DetailHero;
