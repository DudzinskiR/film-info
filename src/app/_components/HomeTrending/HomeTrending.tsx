import Movie from "@/components/Movie/Movie";
import { Genre } from "@/types/api/Genres";
import { TrendingMovies } from "@/types/api/TrendingMovies";

interface HomeTrendingProps {
  data: TrendingMovies;
  genres: Genre[];
}

const HomeTrending = ({ data, genres }: HomeTrendingProps) => {
  return (
    <section className=" w-full py-16 flex justify-center">
      <div className="page-content flex flex-row gap-10">
        {data.results.slice(0, 7).map((item) => (
          <Movie key={item.id} data={item} genres={genres} />
        ))}
      </div>
    </section>
  );
};

export default HomeTrending;
