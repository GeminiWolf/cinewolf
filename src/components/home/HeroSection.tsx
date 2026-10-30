import React, { useEffect } from "react";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { MediaService } from "@/service/media.service";
import { useMovieStore } from "@/store/movieStore";
import { Result } from "@/types/movie";
import dayjs from "dayjs";
import { genreNames } from "@/utils/genres";
import { HeroSkeleton } from "@/components/Skeletons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSection = () => {
  const mediaService = new MediaService();
  const { movies, isLoading, error, fetchNowPlaying } = useMovieStore();

  useEffect(() => {
    fetchNowPlaying();
  }, [fetchNowPlaying]);

  const getBackdropUrl = (movie: Result) => {
    return mediaService.getPathImage(movie?.backdrop_path);
  };

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return (
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/30 !w-3 !h-3",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-purple-500 !w-8",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={getBackdropUrl(movie)}
                  alt={movie?.title}
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-purple-600/30 backdrop-blur-lg rounded-full text-sm font-medium">
                    Featured Movie
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    {movie?.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-gray-200">
                    {movie?.vote_average > 0 && (
                      <span
                        className="flex items-center space-x-1"
                        aria-label={`Rated ${movie.vote_average.toFixed(1)} out of 10`}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </span>
                    )}
                    {movie?.release_date && (
                      <span>{dayjs(movie.release_date).format("YYYY")}</span>
                    )}
                    {genreNames(movie?.genre_ids)
                      .slice(0, 3)
                      .map((g) => (
                        <span
                          key={g}
                          className="px-3 py-1 bg-gray-800/80 border border-gray-600 rounded-full text-sm text-gray-100"
                        >
                          {g}
                        </span>
                      ))}
                  </div>
                  <p className="text-lg text-gray-300 max-w-lg">
                    {movie?.overview}
                  </p>
                  <div className="flex space-x-4">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Watch Now</span>
                    </Link>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
                    >
                      <span>More Info</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer">
        <ChevronLeft className="w-6 h-6 text-white" />
      </div>
      <div className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full cursor-pointer">
        <ChevronRight className="w-6 h-6 text-white" />
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20"></div>
    </section>
  );
};

export default HeroSection;
