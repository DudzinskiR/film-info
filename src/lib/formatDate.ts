import { format, parse } from "date-fns";
import { pl } from "date-fns/locale/pl";

export const formatDate = (
  date: string,
  formatStr: "short" | "full" = "short"
) => {
  try {
    const parsedReleaseDate = parse(date, "yyyy-MM-dd", new Date());
    const formattedDate = format(
      parsedReleaseDate,
      formatStr === "short" ? "dd MMM yyyy" : "dd MMMM yyyy",
      {
        locale: pl,
      }
    );

    return formattedDate;
  } catch (e) {
    return "";
  }
};
