import { Metadata } from "next";
import { notFound } from "next/navigation";

import { TMDBApi } from "@/lib/api/TMDBApi";

import HomeGenre from "./_components/HomeGenre/HomeGenre";

export const generateMetadata = (): Metadata => {
  return { title: "FilmInfo" };
};

const HomePage = async () => {
  const trendingMovies = await TMDBApi.getTrendingMovies();
  const genres = await TMDBApi.getMovieGenres();

  if (!trendingMovies || !genres) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-10 w-full">
        {genres.map((item) => (
          <HomeGenre key={item.id} genreID={item.id} genres={genres} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
