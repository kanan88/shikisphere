import { ArrowBigLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  query: string;
  resultsLength: number;
}

const Pagination = ({
  page,
  setPage,
  query,
  resultsLength,
}: PaginationProps) => {
  const router = useRouter();

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    router.push(`/?q=${query}&page=${nextPage}`);
  };

  const handlePrev = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      router.push(`/?q=${query}&page=${prevPage}`);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 rounded"
      >
        <ArrowBigLeft size={20} />
        <span className="hidden sm:inline-block">Prev</span>
      </Button>
      <span>page {page}</span>
      <Button
        onClick={handleNext}
        disabled={resultsLength < 8}
        className="px-4 py-2 rounded"
      >
        <span className="hidden sm:inline-block">Next</span>
        <ArrowBigLeft size={20} className="rotate-180" />
      </Button>
    </div>
  );
};

export default Pagination;
