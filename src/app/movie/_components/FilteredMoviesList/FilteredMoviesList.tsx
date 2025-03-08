import Movie from "@/components/Movie/Movie";
import { Genre } from "@/types/api/Genres";
import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";
import React from "react";
import { twJoin } from "tailwind-merge";

interface FilteredMoviesListProps {
  genre: Genre[];
  movies: TrendingMovieDetails[];
}

const FilteredMoviesList = ({ genre, movies }: FilteredMoviesListProps) => {
  return (
    <div
      className={twJoin(
        "grid gap-y-32",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5"
      )}
    >
      {movies.map((item) => (
        <div key={item.id} className="flex justify-center">
          <Movie data={item} genres={genre} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(FilteredMoviesList);
