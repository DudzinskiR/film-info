import { Suspense } from "react";
import SearchPageContent from "./_components/SearchPageContent/SearchPageContent";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return { title: "Szukaj | FilmInfo" };
};

const SearchPage = async () => {
  return (
    <div>
      <Suspense>
        <SearchPageContent />
      </Suspense>
    </div>
  );
};

export default SearchPage;
