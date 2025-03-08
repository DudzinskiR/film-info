"use client";
import { useEffect, useState } from "react";

import { formatDate } from "@/lib/formatDate";
import { getGenre } from "@/lib/getGenre";
import { Genre } from "@/types/api/Genres";
import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";

import CircularRating from "../CircularRating/CircularRating";
import MoviePoster from "../MoviePoster/MoviePoster";
import MovieInfoBox from "./components/MovieInfoBox";
import { twJoin } from "tailwind-merge";
import Link from "next/link";
import { useElementSide } from "@/hook/useElementSide/useElementSide";

interface MovieProps {
  data: TrendingMovieDetails;
  genres: Genre[];
}

const Movie = ({ data, genres }: MovieProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { ref, position } = useElementSide({ rightOffset: 300 });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => setShowInfo(true), 1000);
    } else {
      setShowInfo(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <Link href={`/movie/${data.id}`}>
      <div
        className={twJoin(
          "relative w-[150px] h-[220px]",
          showInfo ? "z-10" : ""
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={ref}
      >
        <MovieInfoBox
          side={position || "left"}
          data={data}
          genres={data.genre_ids
            .map((item) => getGenre(item, genres))
            .filter((item) => !!item)}
          showInfo={showInfo}
        />

        <div
          className={twJoin(
            "duration-300 relative size-full",
            showInfo ? "scale-105" : "scale-100"
          )}
        >
          <MoviePoster url={data.poster_path} width={150} height={220} />
          <div className="absolute bottom-[-25px] left-[5px] scale-60">
            <CircularRating rating={data.vote_average * 10} duration={1000} />
          </div>
        </div>
        <div className="pl-2 text-white">
          <p className="mt-4 line-clamp-2 font-semibold">{data.title}</p>
          <p className="text-sm">{formatDate(data.release_date)}</p>
        </div>
      </div>
    </Link>
  );
};

export default Movie;
