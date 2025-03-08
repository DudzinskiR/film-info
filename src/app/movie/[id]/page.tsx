import { Metadata } from "next";
import { notFound } from "next/navigation";

import { MovieDetails } from "@/types/api/MovieDetails";
import { TMDBApi } from "@/lib/api/TMDBApi";
import MovieHeader from "./_components/MovieHeader";
import MovieVideo from "./_components/MovieVideo";
import { Videos } from "@/types/api/Videos";
import { Credits } from "@/types/api/Credits";
import MovieCredits from "./_components/MovieCredits";
import MovieInfo from "./_components/MovieInfo";
import ReturnToHomePage from "../../../components/ReturnToHomePage/ReturnToHomePage";

interface MovieIDPageProps {
  params: Promise<{ id: string }>;
}

const getMovieData = async (id: string) => {
  try {
    const data = await TMDBApi.get<MovieDetails>(`/movie/${id}?language=pl`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getVideosData = async (id: string) => {
  try {
    const data = await TMDBApi.get<Videos>(`/movie/${id}/videos`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getCreditsData = async (id: string) => {
  try {
    const data = await TMDBApi.get<Credits>(`/movie/${id}/credits?language=pl`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const generateMetadata = async ({
  params,
}: MovieIDPageProps): Promise<Metadata> => {
  const { id } = await params;
  const data = await getMovieData(id);

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
  const movieData = await getMovieData(id);
  const videosData = await getVideosData(id);
  const creditsData = await getCreditsData(id);

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
