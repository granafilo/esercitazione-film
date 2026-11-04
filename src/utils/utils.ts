import { getEpisodesById } from "../api";
import type {
  TypeEpisodes,
  TypePageShows,
  TypeShow,
  TypeShowEpisodes,
} from "../types";

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

export const getSeriesReport1 = (show: TypeShow, index: number) => {
  return {
    posizione: index + 1,
    id: show.id,
    nome: show.name,
    generi: show.genres,
    status: show.status,
    runtime: show.runtime || show.averageRuntime || "Dato non disponibile",
    network: show.network || show.webChannel || "Dato non disponibile",
  };
};

export const getSeasonNumber = (allShowEpisodes: TypeShowEpisodes): number => {
  let seasonNumbers: number[] = [];
  allShowEpisodes.forEach((show) => {
    if (seasonNumbers.indexOf(show.season) == -1) {
      seasonNumbers.push(show.season);
    }
  });

  return seasonNumbers.length;
};

export const getTotalEpisodes = (allShowEpisodes: TypeShowEpisodes): number => {
  return allShowEpisodes.length;
};

export const getTotalRuntime = (allShowEpisodes: TypeShowEpisodes): number => {
  return allShowEpisodes.reduce(
    (totale: number, episodio: TypeEpisodes, index: number) => {
      return (totale += episodio.runtime || totale / index);
    },
    0,
  );
};

export const getAirdate = (
  allShowEpisodes: TypeShowEpisodes,
  last_first: boolean,
): string => {
  const airdateSorted = allShowEpisodes.sort(
    (a, b) => parseInt(b.airdate) - parseInt(a.airdate),
  );
  return last_first
    ? airdateSorted[0].airdate
    : airdateSorted[airdateSorted.length - 1].airdate;
};

export const getTopEpisode = (
  allShowEpisodes: TypeShowEpisodes,
): TypeEpisodes => {
  let topEpisode: TypeEpisodes = allShowEpisodes[0];
  allShowEpisodes.forEach((show) => {
    if (show.rating.average >= topEpisode.rating.average) {
      topEpisode = show;
    }
  });
  return topEpisode;
};

const getShowsReport = async (show: TypeShow, index: number) => {
  const allShowEpisodes = await getEpisodesById(show.id);

  return {
    index: index + 1,
    name: show.name,
    seasons: getSeasonNumber(allShowEpisodes),
    runtime: getTotalRuntime(allShowEpisodes),
    first_airdate: getAirdate(allShowEpisodes, true),
    last_airdate: getAirdate(allShowEpisodes, false),
    topEpisode: getTopEpisode(allShowEpisodes),
  };
};

export const getSeriesReport = async (allTimeTopShows: TypeShow[]) => {
  const promises = allTimeTopShows.map(async (show, index) => {
    return getShowsReport(show, index);
  });

  return await Promise.all(promises);
};
