import type { TypePageShows, TypeShow } from "../types";

const getYearFromDate = (date: string): number => {
  return parseInt(date.slice(0, 4));
};

export const getLastYear = (allShows: TypePageShows): number => {
  let lastDate: number = getYearFromDate(allShows[0].premiered);
  allShows.forEach((show) => {
    const currentCheck = getYearFromDate(show.premiered);
    if (lastDate < currentCheck) lastDate = currentCheck;
  });
  return lastDate;
};

const getShowsFromLastYear = (allShows: TypePageShows, LAST_YEAR: number) => {
  return allShows.filter((film) => parseInt(film.premiered) == LAST_YEAR);
};

export const getDate = (
  allShows: TypeShow[],
  LAST_YEAR: number,
  last_first: boolean,
) => {
  const showFromLastYear = getShowsFromLastYear(allShows, LAST_YEAR).sort(
    (a, b) => parseInt(b.premiered) - parseInt(a.premiered),
  );
  if (last_first) {
    return showFromLastYear[0].premiered;
  } else {
    return showFromLastYear[showFromLastYear.length - 1].premiered;
  }
};

export const getTopShows = (
  Shows: TypeShow[],
  limit: number,
  last_year: boolean,
  LAST_YEAR: number,
): TypeShow[] => {
  const allShows = last_year ? getShowsFromLastYear(Shows, LAST_YEAR) : Shows;

  let topShows: TypeShow[] = allShows.slice(0, limit);
  topShows = topShows.sort((a, b) => b.rating.average - a.rating.average);

  allShows.forEach((show) => {
    if (show.rating.average >= topShows[limit - 1].rating.average) {
      topShows.push(show);
      topShows = topShows.sort((a, b) => b.rating.average - a.rating.average);
      topShows = topShows.slice(0, limit);
    }
  });

  return topShows;
};
