const BASE_URL = "https://api.jikan.moe/v4/";

export async function getTopManga(page: number) {
  const url = `${BASE_URL}top/manga?page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch manga datas!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getSearchManga(q: string) {
  const url = `${BASE_URL}manga?q=${q}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failde to fetch manga datas!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function getFullManga(id: number) {
  const url = `${BASE_URL}manga/${id}/full`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch single manga data!");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return error;
  }
}

async function getMangaRecomentations(id: number) {
  const url = `${BASE_URL}manga/${id}/recommendations`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations!");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return error;
  }
}

export async function getMangaData(id: number) {
  const manga = {};

  manga["details"] = await getFullManga(id);
  manga["recommendations"] = await getMangaRecomentations(id);

  return manga;
}
