import { MovieDetails } from "@/types/api/MovieDetails";
import AnimatedCounter from "@/components/AnimatedCounter/AnimatedCounter";
import { ReactNode } from "react";

interface MovieInfoProps {
  data: MovieDetails;
}

const MovieInfo = ({ data }: MovieInfoProps) => {
  const renderLabel = (label: string, value: ReactNode) => {
    return (
      <div>
        <p className="text-white/80 text-sm">{label}</p>
        <p className="text-xl text-white font-semibold">{value}</p>
      </div>
    );
  };

  return (
    <section className="flex justify-center">
      <div className="page-content grid grid-cols-2 px-10 py-5 gap-y-5">
        {data.budget
          ? renderLabel(
              "Budżet",
              <AnimatedCounter value={data.budget} duration={1000} prefix="$" />
            )
          : renderLabel("Budżet", "Nie znany")}
        {data.budget
          ? renderLabel(
              "Przychód",
              <AnimatedCounter
                value={data.revenue}
                duration={1000}
                prefix="$"
              />
            )
          : renderLabel("Przychód", "Nie znany")}

        {renderLabel("Oryginalny język", data.original_language)}
        {renderLabel(
          "Stan",
          data.status === "Released" ? "Wydano" : "W produkcji"
        )}
      </div>
    </section>
  );
};

export default MovieInfo;
