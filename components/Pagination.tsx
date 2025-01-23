import { ArrowBigLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  query: string;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, query }) => {
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
        Previous
      </Button>

      <Button onClick={handleNext} className="px-4 py-2 rounded">
        Next
        <ArrowBigLeft size={20} className="rotate-180" />
      </Button>
    </div>
  );
};

export default Pagination;
