"use client";

import AnimeCard, { AnimeProps } from "@/components/AnimeCard";
import { ModeToggle } from "@/components/ModeToggle";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { fetchAnime } from "@/lib/actions/anime.actions";
import { Search } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const fetchResults = async () => {
    const data = await fetchAnime(page, query);
    setResults(data);
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
        <Button onClick={fetchResults} className="px-4 py-2 rounded">
          <Search size={20} />
        </Button>
      </section>

      <section className="min-h-screen/3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {results.map((item: AnimeProps, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>

      {results.length > 0 && (
        <section>
          <Pagination
            page={page}
            setPage={setPage}
            fetchResults={fetchResults}
          />
        </section>
      )}
    </main>
  );
};

export default HomePage;
