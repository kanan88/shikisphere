"use client";

import { AnimeProps } from "@/components/AnimeCard";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedShortlist = localStorage.getItem("shortlist");
    if (storedShortlist) {
      setShortlist(JSON.parse(storedShortlist));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("shortlist", JSON.stringify(shortlist));
    }
  }, [shortlist, isInitialized]);

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

export default ShortlistProvider;

export const useShortlist = () => {
  const context = useContext(ShortlistContext);

  if (!context) {
    throw new Error("useShortlist must be used within a ShortlistProvider");
  }

  return context;
};
