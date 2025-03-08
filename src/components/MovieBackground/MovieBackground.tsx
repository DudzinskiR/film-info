import { ReactNode } from "react";

interface MovieBackgroundProps {
  children: ReactNode;
  url: string;
}

const MovieBackground = ({ children, url }: MovieBackgroundProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="w-full h-full absolute animate-scale-down"
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left calc((50vw - 170px) - 340px) top",
        }}
      ></div>
      {children}
      <div className="size-full absolute top-0 bg-linear-to-r from-zinc-900 from-[calc((50vw-170px)-340px)] to-zinc-900/70"></div>
    </div>
  );
};

export default MovieBackground;
