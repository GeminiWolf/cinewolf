import React from "react";
import { Calendar, Clock, Globe, DollarSign, Users, Award } from "lucide-react";
import {
  MovieDetail,
  ProductionCompany,
  ProductionCountry,
} from "@/types/movieDetail";
import { TVDetail } from "@/types/seriesDetails";
import dayjs from "dayjs";

interface MediaInfoProps {
  media: MovieDetail | TVDetail;
  isTV?: boolean;
}

const MediaInfo: React.FC<MediaInfoProps> = ({ media, isTV = false }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
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

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-gray-400 text-sm">Release Date</span>
              <p className="text-white font-medium">
                {getReleaseDate()
                  ? dayjs(getReleaseDate()).format("MMMM DD, YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>

          {getRuntime() && (
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-gray-400 text-sm">Runtime</span>
                <p className="text-white font-medium">{getRuntime()}</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-gray-400 text-sm">Language</span>
              <p className="text-white font-medium">
                {media.spoken_languages?.[0]?.english_name ||
                  media.original_language?.toUpperCase() ||
                  "N/A"}
              </p>
            </div>
          </div>

          {!isTV && "budget" in media && media.budget > 0 && (
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-gray-400 text-sm">Budget</span>
                <p className="text-white font-medium">
                  {formatCurrency(media.budget)}
                </p>
              </div>
            </div>
          )}

          {!isTV && "revenue" in media && media.revenue > 0 && (
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-gray-400 text-sm">Revenue</span>
                <p className="text-white font-medium">
                  {formatCurrency(media.revenue)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-gray-400 text-sm">Status</span>
              <p className="text-white font-medium">{media.status}</p>
            </div>
          </div>

          {isTV && "number_of_episodes" in media && (
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-gray-400 text-sm">Episodes</span>
                <p className="text-white font-medium">
                  {media.number_of_episodes}
                </p>
              </div>
            </div>
          )}

          {isTV && "number_of_seasons" in media && (
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-gray-400 text-sm">Seasons</span>
                <p className="text-white font-medium">
                  {media.number_of_seasons}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-gray-400 text-sm">Vote Average</span>
              <p className="text-white font-medium">
                {media.vote_average.toFixed(1)}/10
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <span className="text-gray-400 text-sm">Vote Count</span>
              <p className="text-white font-medium">
                {media.vote_count.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Companies */}
      {media.production_companies && media.production_companies.length > 0 && (
        <div className="pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Production Companies
          </h3>
          <div className="flex flex-wrap gap-2">
            {media.production_companies.map((company: ProductionCompany) => (
              <span
                key={company.id}
                className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300"
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Countries */}
      {media.production_countries && media.production_countries.length > 0 && (
        <div className="pt-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Production Countries
          </h3>
          <div className="flex flex-wrap gap-2">
            {media.production_countries.map(
              (country: ProductionCountry, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300"
                >
                  {country.name}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaInfo;
