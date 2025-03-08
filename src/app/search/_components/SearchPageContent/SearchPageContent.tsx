"use client";

import Movie from "@/components/Movie/Movie";
import { TMDBApi } from "@/lib/api/TMDBApi";
import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";
import { TrendingMovies } from "@/types/api/TrendingMovies";
import { FetchStatus } from "@/types/FetchStatus";
import { TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { twJoin } from "tailwind-merge";

const SearchPageContent = () => {
  const [searchName, setSearchName] = useState("");
  const [movies, setMovies] = useState<TrendingMovieDetails[]>([]);
  const [status, setStatus] = useState<FetchStatus>("IDLE");

  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    if (name) setSearchName(name);
  }, [searchParams]);

  useEffect(() => {
    setStatus("IDLE");
  }, [searchName]);

  useEffect(() => {
    if (status !== "IDLE") {
      return;
    }

    const timer = setTimeout(async () => {
      setStatus("FETCHING");
      setMovies([]);
      try {
        const result = await TMDBApi.get<TrendingMovies>(
          `search/movie?query=${searchName}&include_adult=false&language=pl&page=1`
        );
        setStatus("DONE");
        console.log(result.results);
        if (result) setMovies(result.results);
      } catch (e) {
        setStatus("ERROR");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchName, status]);

  const renderEmptyName = () => {
    return (
      <div className="text-xl mt-10 text-center">
        Aby wyszukać film podaj jego nazwę
      </div>
    );
  };

  const renderEmptyList = () => {
    return (
      <div className="text-xl mt-10 text-center">
        Brak filmów powiązanych z podaną nazwą
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className="flex flex-col gap-10 items-center">
        <p className="text-xl mt-10 text-center">
          Wystąpił nieoczekiwany problem
        </p>
        <button
          className="border-2 w-fit p-3 cursor-pointer"
          onClick={() => {
            setStatus("IDLE");
          }}
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  };

  const renderMovieList = () => {
    return (
      <div
        className={twJoin(
          "grid  gap-5 gap-y-32 pt-10",
          "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        )}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-center">
            <Movie data={movie} genres={[]} />
          </div>
        ))}
      </div>
    );
  };

  const renderList = () => {
    if (status === "ERROR") {
      return renderError();
    }

    if (searchName.length === 0) {
      return renderEmptyName();
    }

    if (movies.length === 0) {
      return renderEmptyList();
    }

    return renderMovieList();
  };

  return (
    <div className="flex justify-center">
      <div className="page-content pt-10">
        <div className="px-5 md:px-10">
          <TextField
            className="w-full"
            id="filled-basic"
            label="Nazwa filmu"
            variant="filled"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
          />
        </div>
        <div
          className={twJoin(
            "duration-300",
            status === "FETCHING" ? "blur" : "blur-none"
          )}
        >
          {renderList()}
        </div>
      </div>
    </div>
  );
};

export default SearchPageContent;
