"use client";
export const dynamic = "force-dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnimeCard, { AnimeProps } from "@/components/AnimeCard";
import { ModeToggle } from "@/components/ModeToggle";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { fetchAnime } from "@/lib/actions/anime.actions";
import { Search } from "lucide-react";
import Loading from "@/components/Loading";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<AnimeProps[]>([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    const data = await fetchAnime(page, query);
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleSearch = () => {
    router.push(`/?q=${query}&page=1`);
    setPage(1);
    fetchResults();
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
          className="border p-2 rounded w-full"
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
            <section>
              <Pagination
                page={page}
                setPage={(newPage) => {
                  router.push(`/?q=${query}&page=${newPage}`);
                  setPage(newPage);
                }}
                query={query}
              />
            </section>
          )}
          <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {results.map((item: AnimeProps, index: number) => (
              <AnimeCard key={item.id} anime={item} index={index} />
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default SearchPage;
