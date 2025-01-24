"use client";

import { Button } from "@/components/ui/button";
import AnimeCard from "@/components/AnimeCard";
import { useShortlist } from "@/contexts/ShortlistProvider";
import { HomeIcon, Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const ShortlistPage = () => {
  const { toast } = useToast();
  const { shortlist, clearShortlist } = useShortlist();

  if (shortlist.length === 0) {
    redirect("/");
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <section className="flex flex-col sm:flex-row justify-between sm:items-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-5 sm:mb-0">
          Your Anime List
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              clearShortlist();
              toast({
                title: "All cleared from your list",
                description: "Successfully cleared your list",
                variant: "destructive",
              });
            }}
            className="hover:bg-red-500"
          >
            <Trash2Icon />
            <span>Clear list</span>
          </Button>
          <Link href="/">
            <Button>
              <HomeIcon />
              <span>Home</span>
            </Button>
          </Link>
        </div>
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
