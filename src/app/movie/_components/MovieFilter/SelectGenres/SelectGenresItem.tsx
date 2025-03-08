"use client";

import { Genre } from "@/types/api/Genres";
import { twJoin } from "tailwind-merge";

interface SelectGenresItemProps {
  genre: Genre;
  onClick: (val: Genre) => void;
  isActive: boolean;
}

const SelectGenresItem = ({
  genre,
  onClick,
  isActive,
}: SelectGenresItemProps) => {
  return (
    <button
      className={twJoin(
        "inline-flex mx-1 my-1 border-2 rounded-xl px-2 py-1 text-sm cursor-pointer",
        "border-[#0e9b71] hover:bg-[#0e9b71]",
        isActive ? "bg-[#0e9b71]" : "bg-transparent"
      )}
      onClick={() => onClick(genre)}
    >
      {genre.name}
    </button>
  );
};

export default SelectGenresItem;
