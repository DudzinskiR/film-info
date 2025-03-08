"use client";

import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

import { TMDBApi } from "@/lib/api/TMDBApi";
import { Genre } from "@/types/api/Genres";
import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";
import { TrendingMovies } from "@/types/api/TrendingMovies";
import { FetchStatus } from "@/types/FetchStatus";
import { FilterData } from "@/types/FilterData";

import FilteredMoviesList from "../FilteredMoviesList/FilteredMoviesList";
import MovieFilter from "../MovieFilter/MovieFilter";
import { useSearchParams } from "next/navigation";

interface MovieSectionProps {
  genres: Genre[];
}

const getEndpoint = (data: FilterData) => {
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
  return endpoint;
};

const MovieSection = ({ genres }: MovieSectionProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    userScore: [0, 100],
    sortBy: "popularity.desc",
    genres: [],
  });

  const [movies, setMovies] = useState<TrendingMovieDetails[]>([]);
  const [status, setStatus] = useState<FetchStatus>("IDLE");

  const searchParams = useSearchParams();

  useEffect(() => {
    const genre = searchParams.get("genre");
    if (genre)
      setFilterData((prev) => ({ ...prev, genres: [parseInt(genre)] }));
  }, [searchParams]);

  useEffect(() => {
    setStatus("IDLE");
  }, [filterData]);

  useEffect(() => {
    if (status !== "IDLE") {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setStatus("FETCHING");
        const result = await TMDBApi.get<TrendingMovies>(
          getEndpoint(filterData)
        );

        setStatus("DONE");
        if (result.results) {
          setMovies(result.results);
        }
      } catch (e) {
        setStatus("ERROR");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [filterData, status]);

  const renderList = () => {
    if (status === "ERROR") return renderError();

    if (movies.length === 0) return renderEmptyList();

    return renderMovieList();
  };

  const renderMovieList = () => {
    return (
      <div
        className={twJoin(
          "lg:col-span-2 col-span-1 mt-16 duration-300",
          status === "FETCHING" ? "blur" : "blur-none"
        )}
      >
        <FilteredMoviesList genre={genres} movies={movies} />
      </div>
    );
  };

  const renderEmptyList = () => {
    return (
      <div className="lg:col-span-2 col-span-1 mt-24 flex flex-col items-center gap-5">
        <p className="text-3xl">Ładowanie...</p>
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className="lg:col-span-2 col-span-1 mt-24 flex flex-col items-center gap-5">
        <p className="text-3xl">Nastąpił nieoczekiwany błąd</p>
        <button
          className="border-2 p-3 cursor-pointer"
          onClick={() => setStatus("IDLE")}
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="page-content grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-1">
          <MovieFilter
            genres={genres}
            filterData={filterData}
            onChange={(val) => setFilterData(val)}
          />
        </div>
        {renderList()}
      </div>
    </div>
  );
};

export default MovieSection;
