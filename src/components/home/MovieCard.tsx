import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MediaService } from "@/service/media.service";
import { Result as TrendingResult } from "@/types/trending";

const MovieCard = ({ movie }: { movie: TrendingResult }) => {
  const pathUrl = new MediaService().getPathImage(movie.poster_path);
  const detailUrl =
    movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <Link href={detailUrl} className="block">
      <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-t from-black/60 to-transparent">
          <div className="relative w-full h-80">
            <Image
              src={pathUrl}
              alt={movie.original_name || movie.original_title || ""}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-semibold text-sm mb-2">
              {movie.name || movie.title || ""}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">
                {movie.vote_average}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
