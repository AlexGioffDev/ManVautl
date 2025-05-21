import {
  MangaData,
  MangaDetails,
  MangaRecommendation,
  MangasResults,
} from "@/models/types";

const BASE_URL = "https://api.jikan.moe/v4/";

export async function getTopManga(page: number): Promise<MangasResults> {
  const url = `${BASE_URL}top/manga?page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch manga datas!");
    }
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSearchManga(q: string): Promise<MangasResults> {
  const url = `${BASE_URL}manga?q=${q}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failde to fetch manga datas!");
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getFullManga(id: number): Promise<MangaDetails> {
  const url = `${BASE_URL}manga/${id}/full`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch single manga data!");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getMangaRecomentations(
  id: number
): Promise<MangaRecommendation[]> {
  const url = `${BASE_URL}manga/${id}/recommendations`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations!");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getMangaData(id: number): Promise<MangaData> {
  const details = await getFullManga(id);
  const recommendations = await getMangaRecomentations(id);

  return {
    details,
    recommendations,
  };
}
