import { create } from "zustand";
import { Result } from "@/types/movie";
import { MovieListService } from "@/service/movie.service";

interface MovieState {
  movies: Result[];
  currentSlide: number;
  isLoading: boolean;
  error: string | null;
  fetchNowPlaying: () => Promise<void>;
  setCurrentSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

const movieListService = new MovieListService();

export const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  currentSlide: 0,
  isLoading: false,
  error: null,

  fetchNowPlaying: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await movieListService.getNowPlaying();
      set({ movies: response.results, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch movies",
        isLoading: false,
      });
    }
  },

  setCurrentSlide: (index: number) => {
    const { movies } = get();
    set({ currentSlide: index % movies.length });
  },

  nextSlide: () => {
    const { movies, currentSlide } = get();
    set({ currentSlide: (currentSlide + 1) % movies.length });
  },

  prevSlide: () => {
    const { movies, currentSlide } = get();
    set({ currentSlide: (currentSlide - 1 + movies.length) % movies.length });
  },
}));
