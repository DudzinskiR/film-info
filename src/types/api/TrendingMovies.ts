import { TrendingMovieDetails } from "./TrendingMovieDetails";

export type TrendingMovies = {
  page: number;
  results: TrendingMovieDetails[];
  total_pages: number;
  total_results: number;
};
