import { TrendingMovies } from "@/types/api/TrendingMovies";
import { API } from "./API";
import { Genre } from "@/types/api/Genres";
import { FilterData } from "@/types/FilterData";
import { MovieDetails } from "@/types/api/MovieDetails";
import { Videos } from "@/types/api/Videos";
import { Credits } from "@/types/api/Credits";
import { DiscoverMovie } from "@/types/api/DiscoverMovie";

class TMDB extends API {
  constructor(apiRoot: string) {
    super(apiRoot);

    super.prepareHeaders = (headers?: object) => {
      return {
        ...headers,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      };
    };
  }

  public async getTrendingMovies() {
    try {
      const data = await TMDBApi.get<TrendingMovies>(
        `/trending/movie/day?language=pl`
      );
      return data;
    } catch (e) {}
  }

  public async getMovieGenres() {
    try {
      const data = await TMDBApi.get<{ genres: Genre[] }>(
        `/genre/movie/list?language=pl`
      );
      return data.genres;
    } catch (e) {}
  }

  public async getDiscoveredMovies(data: FilterData) {
    const minRating = Math.min(...data.userScore);
    const maxRating = Math.max(...data.userScore);
    const sortBy = data.sortBy;
    const genres = data.genres.join(",");

    let endpoint =
      "/discover/movie?include_adult=false&include_video=false&language=pl&page=1";
    endpoint += `&vote_average.lte=${maxRating / 10}`;
    endpoint += `&vote_average.gte=${minRating / 10}`;
    endpoint += `&sort_by=${sortBy}`;
    endpoint += `&with_genres=${genres}`;

    try {
      const data = await TMDBApi.get<TrendingMovies>(endpoint);
      return data;
    } catch (e) {}
  }

  public async getMovie(id: string) {
    try {
      const data = await TMDBApi.get<MovieDetails>(`/movie/${id}?language=pl`);
      return data;
    } catch (e) {}
  }

  public async getVideos(id: string) {
    try {
      const data = await TMDBApi.get<Videos>(`/movie/${id}/videos`);
      return data;
    } catch (e) {}
  }

  public async getCredits(id: string) {
    try {
      const data = await TMDBApi.get<Credits>(
        `/movie/${id}/credits?language=pl`
      );
      return data;
    } catch (e) {}
  }

  public async searchMovies(name: string) {
    try {
      const result = await TMDBApi.get<TrendingMovies>(
        `search/movie?query=${name}&include_adult=false&language=pl&page=1`
      );
      return result;
    } catch (e) {}
  }

  public async getGenreMovies(genreID: number) {
    try {
      const data = await TMDBApi.get<DiscoverMovie>(
        `/discover/movie?include_adult=false&include_video=false&language=pl&page=1&sort_by=popularity.desc&with_genres=${genreID}`
      );

      return data;
    } catch (e) {}
  }
}

export const TMDBApi = new TMDB("https://api.themoviedb.org/3/");
