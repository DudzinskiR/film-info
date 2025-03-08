import { Video } from "@/types/api/Videos";

interface MovieVideoProps {
  video: Video;
  movieTitle: string;
}

const MovieVideo = ({ video, movieTitle }: MovieVideoProps) => {
  return (
    <section className="bg-black w-full my-5 flex flex-col items-center py-5">
      <div>
        <p className="text-white text-2xl pb-5 sm:text-left text-center">
          Wideo do filmu {movieTitle}
        </p>
        <iframe
          className="rounded-lg sm:w-[560px] w-[310px]"
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${video.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default MovieVideo;
