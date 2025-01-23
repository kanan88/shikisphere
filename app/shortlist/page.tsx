"use client";

import { Button } from "@/components/ui/button";
import AnimeCard from "@/components/AnimeCard";
import { useShortlist } from "@/contexts/ShortlistProvider";
import { Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";

const ShortlistPage = () => {
  const { shortlist, clearShortlist } = useShortlist();

  if (shortlist.length === 0) {
    redirect("/");
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <section className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Your Anime List
        </h2>
        <Button onClick={clearShortlist} className="hover:bg-red-500">
          <Trash2Icon />
          <span className="hidden sm:block">Clear Shortlist</span>
        </Button>
      </section>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {shortlist.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} index={Number(anime.id)} />
        ))}
      </section>
    </main>
  );
};

export default ShortlistPage;
