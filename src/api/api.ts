import type { TypePageShows } from "../types";

const BASE_URL = `https://api.tvmaze.com`;

export const getShowsByPage = async (
  pageNumber: number,
): Promise<TypePageShows> => {
  try {
    const response = await fetch(`${BASE_URL}/shows?page=${pageNumber}`);
    if (response.status === 200) {
      return await response.json();
    }
    return [];
  } catch (error: unknown) {
    if (error instanceof Error) console.log("ERRORE: ", error);
    throw new Error("Errore: Servizio non disponibile");
  }
};
