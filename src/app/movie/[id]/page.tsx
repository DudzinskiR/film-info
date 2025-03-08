import { Metadata } from "next";
import { notFound } from "next/navigation";

import { TMDBApi } from "@/lib/api/TMDBApi";

import ReturnToHomePage from "../../../components/ReturnToHomePage/ReturnToHomePage";
import MovieCredits from "./_components/MovieCredits";
import MovieHeader from "./_components/MovieHeader";
import MovieInfo from "./_components/MovieInfo";
import MovieVideo from "./_components/MovieVideo";

interface MovieIDPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: MovieIDPageProps): Promise<Metadata> => {
  const { id } = await params;
  const data = await TMDBApi.getMovie(id);

  if (!data) {
    return { title: "FilmInfo" };
  }

  return {
    title: `${data?.title} (${new Date(
      data.release_date
    ).getFullYear()}) | FilmInfo`,
  };
};

const MovieIDPage = async ({ params }: MovieIDPageProps) => {
  const { id } = await params;
  const movieData = await TMDBApi.getMovie(id);
  const videosData = await TMDBApi.getVideos(id);
  const creditsData = await TMDBApi.getCredits(id);

  const ytVideoData = videosData?.results.filter(
    (item) => item.site === "YouTube"
  )[0];

  if (!movieData) {
    notFound();
  }

  return (
    <div>
      <ReturnToHomePage />
      <MovieHeader data={movieData} />
      <MovieInfo data={movieData} />
      {creditsData && <MovieCredits data={creditsData} />}
      {ytVideoData && (
        <MovieVideo
          video={videosData.results[0]}
          movieTitle={movieData.title}
        />
      )}
    </div>
  );
};

export default MovieIDPage;
