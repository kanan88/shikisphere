"use client";

import { useShortlist } from "@/contexts/ShortlistProvider";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface AnimeProps {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}

interface AnimeCardProps {
  anime: AnimeProps;
  index: number;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const { toast } = useToast();

  const { shortlist, addToShortlist, removeFromShortlist } = useShortlist();

  const isShortlisted = shortlist.some((item) => item.id === anime.id);

  return (
    <div className="max-w-sm rounded relative w-full">
      <div className="relative w-full h-[37vh]">
        <Image
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-normal sm:text-lg line-clamp-1 w-full">
            {anime.name}
          </h2>
          <div className="py-1 px-2 rounded-sm">
            <p className=" text-sm font-bold capitalize">{anime.kind}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base font-bold">
              {anime.episodes || anime.episodes_aired}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-bold text-[#FFAD49]">{anime.score}</p>
          </div>
          <div className="">
            {isShortlisted ? (
              <Button
                onClick={() => {
                  toast({
                    title: "Anime removed!",
                    description: "Successfully removed from the list",
                  });
                  removeFromShortlist(anime.id);
                }}
                className="hover:bg-red-500"
              >
                <Minus />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  toast({
                    title: "Anime added!",
                    description: "Successfully added to the list",
                  });
                  addToShortlist(anime);
                }}
              >
                <Plus />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
