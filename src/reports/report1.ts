import { getShowsByPage } from "../api";
import type { TypePageShows } from "../types";
import { getDate, getLastYear, getTopShows } from "../utils";

const PAGE_ANALYZED = 0;

export const allShows: TypePageShows = await getShowsByPage(PAGE_ANALYZED);
export const LAST_YEAR = getLastYear(allShows);

const topShowsLastYear = getTopShows(allShows, 3, true, LAST_YEAR);
const allTopShows = getTopShows(allShows, 3, false, LAST_YEAR);

const firstDate = getDate(allShows, LAST_YEAR, true);
const lastDate = getDate(allShows, LAST_YEAR, false);

export const getReport1 = () => {
  const data = new Date(Date.now());
  const report = JSON.stringify(
    {
      title: `Top 3 Film per rating - ultimo anno`,
      date: `${data.getDay()} - ${data.getMonth()} - ${data.getFullYear()}`,
      anchor_date: LAST_YEAR,
      timespan: `${firstDate} - ${lastDate}`,
      pagina: `${PAGE_ANALYZED}`,
      topShowLastYear: topShowsLastYear.map((show, index) => {
        return {
          posizione: index,
          id: show.id,
          nome: show.name,
          generi: show.genres,
          status: show.status,
          runtime:
            show.runtime || show.averageRuntime || "Dato non disponibile",
          network: show.network || show.webChannel || "Dato non disponibile",
        };
      }),
      topShowAllTime: allTopShows.map((show, index) => {
        return {
          posizione: index,
          id: show.id,
          nome: show.name,
          generi: show.genres,
          status: show.status,
          runtime:
            show.runtime || show.averageRuntime || "Dato non disponibile",
          network: show.network || show.webChannel || "Dato non disponibile",
        };
      }),
    },
    null,
    1,
  );

  console.log(report);
};
