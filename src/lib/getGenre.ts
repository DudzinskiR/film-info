import { Genre } from "@/types/api/Genres";

export const getGenre = (id: number, genres: Genre[]) => {
  return genres.find((item) => item.id === id);
};
