import { getShowsByPage } from "../api";
import type { TypePageShows } from "../types";
import { getLastYear, getSeriesReport, getTopShows } from "../utils";

const PAGE_ANALYZED = 0;

const allShows: TypePageShows = await getShowsByPage(PAGE_ANALYZED);
const LAST_YEAR = getLastYear(allShows);

const allTimeTopShows = getTopShows(allShows, 3, false, LAST_YEAR);

const seriesReport = await getSeriesReport(allTimeTopShows);

export const getReport2 = () => {
  const data = new Date(Date.now());

  const report = JSON.stringify(
    {
      title: `Top 3 Film per rating`,
      date: `${data.getDay()} - ${data.getMonth()} - ${data.getFullYear()}`,
      series: seriesReport,
    },
    null,
    1,
  );

  console.log(report);
};
