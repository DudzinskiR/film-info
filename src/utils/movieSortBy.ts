import { SelectData } from "@/types/SelectData";

export const movieSortByType: SelectData[] = [
  {
    id: "popularity.asc",
    value: "Popularność rosnąco",
  },
  {
    id: "popularity.desc",
    value: "Popularność malejąco",
  },
  {
    id: "primary_release_date.asc",
    value: "Data premiery rosnąco",
  },
  {
    id: "primary_release_date.desc",
    value: "Data premiery malejąco",
  },
  {
    id: "title.asc",
    value: "Tytuł rosnąco",
  },
  {
    id: "title.desc",
    value: "Tytuł malejąco",
  },
  {
    id: "vote_average.asc",
    value: "Ocena rosnąco",
  },
  {
    id: "vote_average.desc",
    value: "Ocena malejąco",
  },
];
