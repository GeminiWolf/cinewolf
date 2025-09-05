import axios from "axios";

import { getHeaderOptions } from "@/utils/getHeaderOptions";
import { MovieDetail } from "@/types/movieDetail";
import { MovieListResponse } from "@/types/movie";

export class MovieListService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}`;

  async getNowPlaying(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/now_playing?page=${page}`,
      getHeaderOptions()
    );
    return data as MovieListResponse;
  }

  async getPopular(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/popular?page=${page}`,
      getHeaderOptions()
    );
    return data as MovieListResponse;
  }

  async getTopRated(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/top_rated?page=${page}`,
      getHeaderOptions()
    );
    return data as MovieListResponse;
  }

  async getUpcoming(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/upcoming?page=${page}`,
      getHeaderOptions()
    );
    return data as MovieListResponse;
  }

  async searchMovies(query: string, page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`,
      getHeaderOptions()
    );
    return data as MovieListResponse;
  }
}

export class MovieService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}`;

  async getMovie(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/${id}?append_to_response=videos,images`,
      getHeaderOptions()
    );
    return data;
  }

  async getMovieDetail(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/${id}?append_to_response=videos,images,credits,similar,recommendations`,
      getHeaderOptions()
    );
    return data as MovieDetail;
  }
}
