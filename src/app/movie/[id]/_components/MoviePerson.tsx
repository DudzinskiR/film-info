"use client";

import { useFadeInOnVisible } from "@/hook/useFadeInOnVisible/useFadeInOnVisible";
import { getProfilePath } from "@/lib/imageSrc";
import Image from "next/image";
import { useState } from "react";

interface MoviePersonProps {
  profilePath: string | null;
  fullName: string;
  role: string;
  delay?: number;
}

const MoviePerson = ({
  profilePath,
  fullName,
  role,
  delay,
}: MoviePersonProps) => {
  const [error, setError] = useState(false);
  const { isVisible, ref } = useFadeInOnVisible({
    timeout: delay,
    offset: 100,
  });
  return (
    <div
      className={`border-2 rounded-lg overflow-hidden border-gray-400 shadow w-[160px] shrink-0 hover:bg-gray-100 bg-gray-300 duration-300 group ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
      ref={ref}
    >
      <div className="overflow-hidden ">
        <Image
          className="hover:scale-110 group-hover:scale-110 duration-300"
          src={
            error || !profilePath
              ? "/defaultPerson.png"
              : getProfilePath(profilePath || "")
          }
          alt={""}
          width={156}
          height={197}
          onError={() => setError(true)}
        />
      </div>
      <div className="p-2 text-sm">
        <p className="font-semibold line-clamp-2 text-black">{fullName}</p>
        <p className="text-gray-800 mt-2">{role}</p>
      </div>
    </div>
  );
};

export default MoviePerson;
