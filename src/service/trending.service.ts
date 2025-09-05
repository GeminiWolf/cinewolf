import axios from "axios";

import { getHeaderOptions } from "@/utils/getHeaderOptions";
import { TrendingResponse } from "@/types/trending";

export class TrendingService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}`;

  async getTrendingMovies(timeWindow: string = "week") {
    const { data } = await axios.get(
      `${this.baseUrl}/trending/movie/${timeWindow}`,
      getHeaderOptions()
    );
    return data as TrendingResponse;
  }

  async getTrendingSeries(timeWindow: string = "week") {
    const { data } = await axios.get(
      `${this.baseUrl}/trending/tv/${timeWindow}`,
      getHeaderOptions()
    );
    return data as TrendingResponse;
  }
}
