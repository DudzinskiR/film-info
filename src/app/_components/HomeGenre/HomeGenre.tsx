"use client";

import { useEffect, useState } from "react";

import { useFadeInOnVisible } from "@/hook/useFadeInOnVisible/useFadeInOnVisible";
import { TMDBApi } from "@/lib/api/TMDBApi";
import { DiscoverMovie } from "@/types/api/DiscoverMovie";
import { FetchStatus } from "@/types/FetchStatus";
import { Genre } from "@/types/api/Genres";
import MovieList from "@/components/MovieList/MovieList";
import { twJoin } from "tailwind-merge";
import { getBackdropPath } from "@/lib/imageSrc";
import Link from "next/link";

interface HomeGenre {
  genres: Genre[];
  genreID: number;
}

const HomeGenre = ({ genres, genreID }: HomeGenre) => {
  const { isVisible, ref } = useFadeInOnVisible({ offset: 400 });
  const [movieDetails, setMovieDetails] = useState<DiscoverMovie>();
  const [status, setStatus] = useState<FetchStatus>("IDLE");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("FETCHING");
        const data = await TMDBApi.get<DiscoverMovie>(
          `/discover/movie?include_adult=false&include_video=false&language=pl&page=1&sort_by=popularity.desc&with_genres=${genreID}`
        );

        setMovieDetails(data);
        setStatus("DONE");
      } catch (e) {
        console.error(e);
        setStatus("ERROR");
      }
    };

    if (status === "IDLE" && isVisible) {
      fetchData();
    }
  }, [genreID, isVisible, status]);

  return (
    <section
      ref={ref}
      className={twJoin(
        "h-[450px] w-full duration-300 flex justify-center",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      )}
    >
      <div className="max-w-[1600px] w-full absolute h-full pointer-events-none -z-10">
        <div
          className="w-full h-full absolute -z-10 opacity-50 saturate-150"
          style={{
            backgroundImage: `url(${getBackdropPath(
              movieDetails?.results[0].backdrop_path || ""
            )})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="size-full absolute top-0 bg-linear-(--movie-group-gradient) "></div>
      </div>
      <div className="page-content flex flex-col justify-center px-5">
        <Link href={`/movie?genre=${genreID}`}>
          <h3 className="text-3xl font-semibold text-white text-center md:text-left md:pl-5 underline">
            {genres.find((item) => item.id === genreID)?.name} {">"}
          </h3>
        </Link>

        {status !== "ERROR" && movieDetails && (
          <MovieList movies={movieDetails.results} genres={genres} />
        )}

        {status === "ERROR" && (
          <div className="flex flex-col items-center mt-10 h-full gap-4">
            <p className="text-white text-xl">Wystąpił nieoczekiwany błąd</p>
            <button
              className="text-white border-2 p-3 cursor-pointer"
              onClick={() => setStatus("IDLE")}
            >
              Spróbuj jeszcze raz
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeGenre;
