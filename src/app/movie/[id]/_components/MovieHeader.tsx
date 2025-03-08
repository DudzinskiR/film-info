import { MovieDetails } from "@/types/api/MovieDetails";
import CircularRating from "@/components/CircularRating/CircularRating";
import MovieBackground from "@/components/MovieBackground/MovieBackground";
import MoviePoster from "@/components/MoviePoster/MoviePoster";
import { getBackdropPath } from "@/lib/imageSrc";
import humanizeDuration from "humanize-duration";
import Link from "next/link";

interface MovieHeaderProps {
  data: MovieDetails;
}

const MovieHeader = ({ data }: MovieHeaderProps) => {
  return (
    <section>
      <MovieBackground url={getBackdropPath(data.backdrop_path)}>
        <div className="flex justify-center items-center h-full py-10">
          <div className="z-10 relative w-full flex flex-row page-content">
            <div className="hidden md:flex items-center shrink-0">
              <MoviePoster url={data.poster_path} />
            </div>
            <div className=" pl-5 text-white flex-col gap-3">
              <div className="flex flex-row items-center h-fit gap-3 text-4xl">
                <h2 className="font-anton">{data.title}</h2>
                <span className="text-gray-200">
                  ({new Date(data.release_date).getFullYear()})
                </span>
              </div>
              {data.title !== data.original_title ? (
                <p className="text-gray-300 italic">{data.original_title}</p>
              ) : (
                <></>
              )}
              <div className="flex flex-col md:flex-row gap-5 my-3">
                <span>
                  {humanizeDuration(data.runtime * 1000 * 60, {
                    language: "pl",
                  })}
                </span>
                <span>
                  {data.genres.map((item) => (
                    <Link
                      className="float-left ml-2 hover:underline"
                      key={item.id}
                      href={`/movie?genre=${item.id}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </span>
              </div>
              <div className="flex flex-row items-center gap-5">
                <p className="text-xl font-semibold">Ocena oglądających</p>
                <CircularRating
                  rating={data.vote_average * 10}
                  duration={1000}
                />
              </div>

              {data.overview && (
                <div>
                  <p className="text-sm text-gray-300">Opis</p>
                  <p className="text-sma">{data.overview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </MovieBackground>
      <div className="flex md:hidden items-center justify-center shrink-0 my-10">
        <MoviePoster url={data.poster_path} />
      </div>
    </section>
  );
};

export default MovieHeader;
