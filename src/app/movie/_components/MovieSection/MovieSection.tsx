"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

import { TMDBApi } from "@/lib/api/TMDBApi";
import { Genre } from "@/types/api/Genres";
import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";
import { FetchStatus } from "@/types/FetchStatus";
import { FilterData } from "@/types/FilterData";

import FilteredMoviesList from "../FilteredMoviesList/FilteredMoviesList";
import MovieFilter from "../MovieFilter/MovieFilter";

interface MovieSectionProps {
  genres: Genre[];
}

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
        const result = await TMDBApi.getDiscoveredMovies(filterData);

        setStatus("DONE");
        if (result?.results) {
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
