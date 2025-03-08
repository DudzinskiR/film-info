"use client";

import Image from "next/image";
import { useState } from "react";

import { getPosterPath } from "@/lib/imageSrc";
import { imagePlaceholder } from "@/lib/imagePlaceholder";
import React from "react";

interface MoviePosterProps {
  url: string | null;
  width?: number;
  height?: number;
}

const MoviePoster = ({ url, width = 250, height = 380 }: MoviePosterProps) => {
  const [error, setError] = useState(false);

  return (
    <div className="shrink-0">
      <div className="relative rounded-2xl border-4 border-white w-fit overflow-hidden">
        <Image
          className="hover:scale-105 duration-300 animate-fade-ina"
          src={!url || error ? "/defaultPoster.png" : getPosterPath(url)}
          width={width}
          height={height}
          placeholder={imagePlaceholder}
          alt={""}
          onError={() => {
            setError(true);
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(MoviePoster);
