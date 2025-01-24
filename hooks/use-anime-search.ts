import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { fetchAnime } from "@/lib/actions/anime.actions";
import { AnimeProps } from "@/components/AnimeCard";

export function useAnimeSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<string>(() => searchParams.get("q") || "");
  const [results, setResults] = useState<AnimeProps[]>([]);
  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const [loading, setLoading] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
      router.push(`/?q=${query}&page=1`);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch results when `page` or `debouncedQuery` changes
  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAnime(page, debouncedQuery);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQuery]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  // Sync state with URL parameters
  useEffect(() => {
    const newQuery = searchParams.get("q") || "";
    const newPage = Number(searchParams.get("page")) || 1;

    if (newQuery !== query) setQuery(newQuery);
    if (newPage !== page) setPage(newPage);
  }, [searchParams]);

  const handleSearch = () => {
    router.push(`/?q=${query}&page=1`);
    setPage(1);
  };

  return {
    router,
    query,
    setQuery,
    results,
    page,
    setPage,
    loading,
    handleSearch,
  };
}
