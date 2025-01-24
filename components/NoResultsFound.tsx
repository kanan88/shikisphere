import { Search } from "lucide-react";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-16">
      <div className="text-3xl">
        <Search className="h-16 w-16 text-red-400" />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-red-400">
          No Results Found
        </h2>
        <p className="text-gray-500">
          We couldn&apos;t find any matches for your search. Try refining your
          search.
        </p>
      </div>
    </div>
  );
};

export default NoResultsFound;
