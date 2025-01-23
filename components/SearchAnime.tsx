"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AnimeCard, { type AnimeProps } from "@/components/AnimeCard";
import ModeToggle from "@/components/ModeToggle";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { fetchAnime } from "@/lib/actions/anime.actions";
import { Search } from "lucide-react";
import Loading from "@/components/Loading";

const SearchAnime = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<string>(() => searchParams.get("q") || "");
  const [results, setResults] = useState<AnimeProps[]>([]);
  const [page, setPage] = useState<number>(
    () => Number(searchParams.get("page")) || 1
  );
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  // Handle search button click
  const handleSearch = () => {
    router.push(`/?q=${query}&page=1`);
    setPage(1);
  };

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <section className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Explore Anime</h2>
        <ModeToggle />
      </section>

      <section className="flex items-center justify-between gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an anime..."
          className="border p-2 rounded w-full outline-none"
        />
        <Button onClick={handleSearch} className="px-4 py-2 rounded">
          <Search size={20} />
        </Button>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <>
          {results.length > 0 && (
            <>
              <section>
                <Pagination
                  page={page}
                  setPage={(newPage) => {
                    router.push(`/?q=${query}&page=${newPage}`);
                    setPage(newPage);
                  }}
                  query={query}
                  resultsLength={results.length}
                />
              </section>
              <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {results.map((item: AnimeProps, index: number) => (
                  <AnimeCard key={item.id} anime={item} index={index} />
                ))}
              </section>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default SearchAnime;
