import { ImagesResponse, VideosResponse } from "./media";

export interface TVDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: OriginalLanguage[];
  last_air_date: Date;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: OriginCountry[];
  original_language: OriginalLanguage;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: VideosResponse;
  images: ImagesResponse;
  credits: Credits;
  similar: Recommendations;
  recommendations: Recommendations;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Department {
  Art = "Art",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export interface Genre {
  id: number;
  name: string;
}

export enum OriginalLanguage {
  En = "en",
}

export interface TEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: null | string;
}

export interface Network {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: OriginCountry;
}

export enum OriginCountry {
  Us = "US",
}

export interface ProductionCountry {
  iso_3166_1: OriginCountry;
  name: string;
}

export interface Recommendations {
  page: number;
  results: RecommendationsResult[];
  total_pages: number;
  total_results: number;
}

export interface RecommendationsResult {
  adult: boolean;
  backdrop_path: null | string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type?: MediaType;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export enum MediaType {
  Tv = "tv",
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: OriginalLanguage;
  name: string;
}

export interface VideosResult {
  iso_639_1: OriginalLanguage;
  iso_3166_1: OriginCountry;
  name: string;
  key: string;
  site: Site;
  size: number;
  type: Type;
  official: boolean;
  published_at: Date;
  id: string;
}

export enum Site {
  YouTube = "YouTube",
}

export enum Type {
  Featurette = "Featurette",
  Teaser = "Teaser",
  Trailer = "Trailer",
}
