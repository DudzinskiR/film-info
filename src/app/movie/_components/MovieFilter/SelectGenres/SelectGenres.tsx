"use client";

import { Genre } from "@/types/api/Genres";
import SelectGenresItem from "./SelectGenresItem";

interface SelectGenresProps {
  genres: Genre[];
  values: number[];
  onChange: (val: number[]) => void;
}

const SelectGenres = ({ genres, values, onChange }: SelectGenresProps) => {
  const toggleGenre = (genre: Genre) => {
    if (values.includes(genre.id)) {
      onChange(values.filter((item) => item !== genre.id));
    } else {
      onChange([...values, genre.id]);
    }
  };

  return (
    <div className="">
      {genres.map((genre) => (
        <SelectGenresItem
          key={genre.id}
          genre={genre}
          onClick={(val) => toggleGenre(val)}
          isActive={!!values.find((item) => item === genre.id)}
        />
      ))}
    </div>
  );
};

export default SelectGenres;
