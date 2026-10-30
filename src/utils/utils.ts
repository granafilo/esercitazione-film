import { getShowsByPage } from "../api";
import type { TypePageShows } from "../types";

export const allShows: TypePageShows = await getShowsByPage(0);

const getYearFromDate = (date: string): number => {
  return parseInt(date.slice(0, 4));
};

const getLastYear = (allShows: TypePageShows): number => {
  let lastDate: number = getYearFromDate(allShows[0].premiered);
  allShows.forEach((show) => {
    const currentCheck = getYearFromDate(show.premiered);
    if (lastDate < currentCheck) lastDate = currentCheck;
  });
  return lastDate;
};

export const LAST_YEAR = getLastYear(allShows);

export const getTopShows = (allShows: TypePageShows) => {};
