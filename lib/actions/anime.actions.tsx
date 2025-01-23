"use server";

export const fetchAnime = async (page: number, search: string) => {
  try {
    const response = await fetch(
      `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity&search=${search}`
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
