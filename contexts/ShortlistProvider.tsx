"use client";

import { AnimeProps } from "@/components/AnimeCard";
import React, { createContext, useEffect, useState, ReactNode } from "react";

type ShortlistContextType = {
  shortlist: AnimeProps[];
  addToShortlist: (anime: AnimeProps) => void;
  removeFromShortlist: (id: string) => void;
  clearShortlist: () => void;
};

export const ShortlistContext = createContext<ShortlistContextType | undefined>(
  undefined
);

const ShortlistProvider = ({ children }: { children: ReactNode }) => {
  const [shortlist, setShortlist] = useState<AnimeProps[]>([]);

  useEffect(() => {
    const storedShortlist = localStorage.getItem("shortlist");
    if (storedShortlist) {
      setShortlist(JSON.parse(storedShortlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shortlist", JSON.stringify(shortlist));
  }, [shortlist]);

  const addToShortlist = (anime: AnimeProps) => {
    if (!shortlist.some((item) => item.id === anime.id)) {
      setShortlist((prev) => [...prev, anime]);
    }
  };

  const removeFromShortlist = (id: string) => {
    setShortlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearShortlist = () => {
    setShortlist([]);
  };

  return (
    <ShortlistContext.Provider
      value={{ shortlist, addToShortlist, removeFromShortlist, clearShortlist }}
    >
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => {
  const context = React.useContext(ShortlistContext);
  if (context === undefined) {
    throw new Error("useShortlist must be used within a ShortlistProvider");
  }
  return context;
};

export default ShortlistProvider;
