import { TMDBApi } from "@/lib/api/TMDBApi";
import { notFound } from "next/navigation";
import MovieSection from "./_components/MovieSection/MovieSection";
import ReturnToHomePage from "@/components/ReturnToHomePage/ReturnToHomePage";
import { Suspense } from "react";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return { title: "Odkrywaj | FilmInfo" };
};

const MoviePage = async () => {
  const genres = await TMDBApi.getMovieGenres();

  if (!genres) {
    notFound();
  }

  return (
    <div>
      <ReturnToHomePage />
      <Suspense>
        <MovieSection genres={genres} />;
      </Suspense>
    </div>
  );
};

export default MoviePage;
