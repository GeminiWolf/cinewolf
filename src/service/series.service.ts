import axios from "axios";

import { getHeaderOptions } from "@/utils/getHeaderOptions";
import { TVDetail } from "@/types/seriesDetails";
import { SeriesListResponse } from "@/types/series";

export class SeriesListService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}`;

  async getAiringToday(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/airing_today?page=${page}`,
      getHeaderOptions()
    );
    return data as SeriesListResponse;
  }

  async getOnTheAir(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/on_the_air?page=${page}`,
      getHeaderOptions()
    );
    return data as SeriesListResponse;
  }

  async getPopular(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/popular?page=${page}`,
      getHeaderOptions()
    );
    return data as SeriesListResponse;
  }

  async getTopRated(page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/top_rated?page=${page}`,
      getHeaderOptions()
    );
    return data as SeriesListResponse;
  }

  async searchSeries(query: string, page: number = 1) {
    const { data } = await axios.get(
      `${this.baseUrl}/search/tv?query=${encodeURIComponent(
        query
      )}&page=${page}`,
      getHeaderOptions()
    );
    return data as SeriesListResponse;
  }
}

export class SeriesService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}`;

  async getSeries(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/${id}?append_to_response=videos,images`,
      getHeaderOptions()
    );
    return data;
  }

  async getSeriesDetail(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/${id}?append_to_response=videos,images,credits,similar,recommendations`,
      getHeaderOptions()
    );
    return data as TVDetail;
  }
}
