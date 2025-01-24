"use client";

import Link from "next/link";
import AnimeCard, { type AnimeProps } from "@/components/AnimeCard";
import ModeToggle from "@/components/ModeToggle";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { ListCheckIcon, Search } from "lucide-react";
import Loading from "@/components/Loading";
import { Input } from "./ui/input";
import { useShortlist } from "@/contexts/ShortlistProvider";
import { useAnimeSearch } from "@/hooks/use-anime-search";
import NoResultsFound from "./NoResultsFound";

const SearchAnime = () => {
  const {
    query,
    setQuery,
    results,
    page,
    setPage,
    loading,
    handleSearch,
    router,
  } = useAnimeSearch();
  const { shortlist } = useShortlist();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <section className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold hidden sm:block">Explore Anime</h2>
        <div className="flex items-center gap-4">
          {shortlist.length > 0 && (
            <Link href="/shortlist">
              <Button>
                <ListCheckIcon />
                <span>Your animes</span>
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </section>

      <section className="flex items-center justify-between gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
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
          {results.length > 0 ? (
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
          ) : (
            <NoResultsFound />
          )}
        </>
      )}
    </main>
  );
};

export default SearchAnime;
