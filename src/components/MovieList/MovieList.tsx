import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";
import Movie from "../Movie/Movie";
import { Genre } from "@/types/api/Genres";

interface MovieListProps {
  movies: TrendingMovieDetails[];
  genres: Genre[];
  maxMoviesNumber?: number;
}

const MovieList = ({
  movies,
  genres,
  maxMoviesNumber = 10,
}: MovieListProps) => {
  return (
    <div className="h-[350px] overflow-x-auto pt-5 scrollbar">
      <div className="flex flex-row gap-9">
        {movies.slice(0, maxMoviesNumber).map((movie) => (
          <Movie key={movie.id} data={movie} genres={genres} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
