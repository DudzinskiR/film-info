import { Credits } from "@/types/api/Credits";
import MoviePerson from "./MoviePerson";

interface MovieCreditsProps {
  data: Credits;
}

const MovieCredits = ({ data }: MovieCreditsProps) => {
  return (
    <section className="flex justify-center px-3">
      <div className="page-content flex flex-col justify-center gap-10 my-4">
        <div>
          <h3 className="text-2xl font-semibold ml-5 text-white">Aktorzy</h3>
          {data.cast.length > 0 ? (
            <div className="flex flex-row gap-8 overflow-x-auto py-5 scrollbar">
              {data.cast.slice(0, 10).map((item, index) => (
                <MoviePerson
                  key={item.credit_id}
                  fullName={item.name}
                  profilePath={item.profile_path}
                  role={item.character}
                  delay={100 * index}
                />
              ))}
            </div>
          ) : (
            <span className="text-center w-full flex justify-center text-3xl font-bold mt-10">
              Brak wpisów
            </span>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-semibold ml-5 text-white">
            Ekipa filmowa
          </h3>
          {data.crew.length > 0 ? (
            <div className="flex flex-row gap-8 overflow-x-auto py-5 scrollbar">
              {data.crew.slice(0, 10).map((item, index) => (
                <MoviePerson
                  key={item.credit_id}
                  fullName={item.name}
                  profilePath={item.profile_path}
                  role={item.known_for_department}
                  delay={100 * index}
                />
              ))}
            </div>
          ) : (
            <span className="text-center w-full flex justify-center text-3xl font-bold mt-10">
              Brak wpisów
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieCredits;
