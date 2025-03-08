import { formatDate } from "@/lib/formatDate";
import { getPosterPath } from "@/lib/imageSrc";
import { Genre } from "@/types/api/Genres";
import { TrendingMovieDetails } from "@/types/api/TrendingMovieDetails";
import { twJoin } from "tailwind-merge";

interface MovieInfoBox {
  data: TrendingMovieDetails;
  genres: Genre[];
  side: "left" | "right";
  showInfo: boolean;
}

const MovieInfoBox = ({ data, genres, showInfo, side }: MovieInfoBox) => {
  return (
    <div
      className={twJoin(
        "absolute duration-200 bg-white border border-gray-300 rounded-xl shadow shadow-slate-600 overflow-hidden p-4",
        "h-[250px] min-w-[350px] top-[-15px] ",
        side === "left" ? "left-[25px] pl-[140px]" : "right-[25px] pr-[140px]",
        showInfo
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div
          className="w-full h-full absolute  animate-scale-down"
          style={{
            backgroundImage: `url(${getPosterPath(data.poster_path)})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 80px top",
          }}
        ></div>
        <div className="size-full absolute top-0 bg-linear-to-r from-slate-800 from-[80px] to-slate-800/70"></div>
      </div>
      <div className="relative text-white">
        <h3 className="text-3xl line-clamp-2">{data.title}</h3>
        {data.original_title !== data.title && (
          <p className="text-gray-300 italic line-clamp-2">
            {data.original_title}
          </p>
        )}
        <p className="my-3">{formatDate(data.release_date, "full")}</p>
        {genres.slice(0, 5).map((item) => (
          <p key={item.id} className="italic">
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MovieInfoBox;
