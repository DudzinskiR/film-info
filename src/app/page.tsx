import { TMDBApi } from "@/lib/api/TMDBApi";
import { Genre } from "@/types/api/Genres";
import { TrendingMovies } from "@/types/api/TrendingMovies";
import { notFound } from "next/navigation";
import HomeGenre from "./_components/HomeGenre/HomeGenre";

const getTrendingMovie = async () => {
  try {
    const data = await TMDBApi.get<TrendingMovies>(
      `/trending/movie/day?language=pl`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getMovieGenres = async () => {
  try {
    const data = await TMDBApi.get<{ genres: Genre[] }>(
      `/genre/movie/list?language=pl`
    );
    return data.genres;
  } catch (e) {}
};

const HomePage = async () => {
  const trendingMovies = await getTrendingMovie();
  const genres = await getMovieGenres();

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
