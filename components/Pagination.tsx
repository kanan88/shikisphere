import { Button } from "./ui/button";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchResults: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  fetchResults,
}) => {
  const handleNext = () => {
    setPage((prev) => prev + 1);
    fetchResults();
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      fetchResults();
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 rounded"
      >
        Previous
      </Button>
      <span>Page {page}</span>
      <Button onClick={handleNext} className="px-4 py-2 rounded">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
