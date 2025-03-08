"use client";

import { useState } from "react";
import UserScoreSlider from "../UserScoreSlider/UserScoreSlider";
import SearchSortBy from "../SearchSortBy/SearchSortBy";
import { movieSortByType } from "@/utils/movieSortBy";
import SelectGenres from "../SelectGenres/SelectGenres";
import { Genre } from "@/types/api/Genres";

interface SearchMovieProps {
  genres: Genre[];
}
const SearchMovie = ({ genres }: SearchMovieProps) => {
  const [selectedUserScore, setSelectedUserScore] = useState([0, 100]);
  const [sortBy, setSortBy] = useState<string>("popularity.asc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  return (
    <div className="flex justify-center">
      <div className="page-content mt-10">
        <div className="max-w-[300px]">
          <p>Sortuj po</p>
          <SearchSortBy
            value={sortBy}
            data={movieSortByType}
            onChange={(val) => {
              setSortBy(val);
            }}
          />
          <SelectGenres
            genres={genres}
            values={selectedGenres}
            onChange={(val) => setSelectedGenres(val)}
          />
          <UserScoreSlider
            onChange={(val) => setSelectedUserScore(val)}
            value={selectedUserScore}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
