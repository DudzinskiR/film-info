import { FilterData } from "@/types/FilterData";
import { Genre } from "@/types/api/Genres";
import { movieSortByType } from "@/utils/movieSortBy";
import SearchSortBy from "./SearchSortBy/SearchSortBy";
import SelectGenres from "./SelectGenres/SelectGenres";
import UserScoreSlider from "./UserScoreSlider/UserScoreSlider";

interface MovieFilterProps {
  genres: Genre[];
  filterData: FilterData;
  onChange: (val: FilterData) => void;
}

const MovieFilter = ({ genres, filterData, onChange }: MovieFilterProps) => {
  const renderLabel = (text: string) => {
    return <p className="mt-8 mb-4 text-xl font-semibold">{text}</p>;
  };

  return (
    <div className="flex justify-center">
      <div className="page-content px-5 md:px-10">
        {renderLabel("Sortuj po")}
        <SearchSortBy
          value={filterData.sortBy}
          data={movieSortByType}
          onChange={(val) => {
            onChange({ ...filterData, sortBy: val });
          }}
        />
        {renderLabel("Gatunki")}
        <SelectGenres
          genres={genres}
          values={filterData.genres}
          onChange={(val) => {
            onChange({ ...filterData, genres: val });
          }}
        />
        {renderLabel("Średnia ocena oglądających")}
        <UserScoreSlider
          value={filterData.userScore}
          onChange={(val) => {
            onChange({ ...filterData, userScore: val });
          }}
        />
      </div>
    </div>
  );
};

export default MovieFilter;
