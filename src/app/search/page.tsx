import { Suspense } from "react";
import SearchPageContent from "./_components/SearchPageContent/SearchPageContent";

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
