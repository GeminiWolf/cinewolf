import axios from "axios";

import { getHeaderOptions } from "@/utils/getHeaderOptions";

export class MediaService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_TMDB_API_URL}`;
  private readonly pathUrl = `${process.env.NEXT_PUBLIC_TMDB_PATH_URL}`;

  getPathImage(path: string, size: string = "original") {
    return `${this.pathUrl}/${size}${path}`;
  }

  async getMovieImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/movie/${id}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getSeriesImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/${id}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getCollectionImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/collection/${id}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getCompanyImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/company/${id}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getNetworkImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/network/${id}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getPersonImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/person/${id}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getTaggedImages(id: string) {
    const { data } = await axios.get(
      `${this.baseUrl}/person/${id}/tagged_images`,
      getHeaderOptions()
    );
    return data;
  }

  async getSeasonImages(id: string, seasonNumber: number) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/${id}/season/${seasonNumber}/images`,
      getHeaderOptions()
    );
    return data;
  }

  async getEpisodeImages(
    id: string,
    seasonNumber: number,
    episodeNumber: number
  ) {
    const { data } = await axios.get(
      `${this.baseUrl}/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/images`,
      getHeaderOptions()
    );
    return data;
  }
}
