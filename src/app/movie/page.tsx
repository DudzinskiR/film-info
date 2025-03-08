import { TMDBApi } from "@/lib/api/TMDBApi";
import { Genre } from "@/types/api/Genres";
import { notFound } from "next/navigation";
import MovieSection from "./_components/MovieSection/MovieSection";
import ReturnToHomePage from "@/components/ReturnToHomePage/ReturnToHomePage";
import { Suspense } from "react";

const getMovieGenres = async () => {
  try {
    const data = await TMDBApi.get<{ genres: Genre[] }>(
      `/genre/movie/list?language=pl`
    );
    return data.genres;
  } catch (e) {
    console.log(e);
  }
};

const MoviePage = async () => {
  const genres = await getMovieGenres();

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
