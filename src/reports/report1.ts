import { getShowsByPage } from "../api";
import type { TypePageShows } from "../types";
import { getDate, getLastYear, getSeriesReport1, getTopShows } from "../utils";

const PAGE_ANALYZED = 0;

const allShows: TypePageShows = await getShowsByPage(PAGE_ANALYZED);
const LAST_YEAR = getLastYear(allShows);

const topShowsLastYear = getTopShows(allShows, 3, true, LAST_YEAR);
const allTopShows = getTopShows(allShows, 3, false, LAST_YEAR);

const firstDate = getDate(allShows, LAST_YEAR, true);
const lastDate = getDate(allShows, LAST_YEAR, false);

export const getReport1 = () => {
  const data = new Date(Date.now());
  const report = JSON.stringify(
    {
      title: `Top 3 Film per rating`,
      date: `${data.getDay()} - ${data.getMonth()} - ${data.getFullYear()}`,
      anchor_date: LAST_YEAR,
      timespan: `${firstDate} - ${lastDate}`,
      pagina: `${PAGE_ANALYZED}`,
      topShowLastYear: topShowsLastYear.map((show, index) => {
        return getSeriesReport1(show, index);
      }),
      topShowAllTime: allTopShows.map((show, index) => {
        return getSeriesReport1(show, index);
      }),
    },
    null,
    1,
  );

  console.log(report);
};
