"use server";

const API_BASE_URL = "https://shikimori.one/api/animes";

export const fetchAnime = async (page: number, search: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/?page=${page}&limit=8&order=popularity&search=${encodeURIComponent(
        search
      )}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch anime data:", error);
    throw error;
  }
};
