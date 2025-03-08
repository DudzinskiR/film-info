import { DiscoverMovieDetails } from "./DiscoverMovieDetails";

export type DiscoverMovie = {
  page: number;
  results: DiscoverMovieDetails[];
  total_pages: number;
  total_results: number;
};
