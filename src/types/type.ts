export type TypeShow = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: TypeGenres;
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string; // formato data "YYYY-MM-DD"
  ended: string; // formato data "YYYY-MM-DD"
  officialSite: string;
  schedule: TypeSchedule;
  rating: TypeRating;
  weight: number;
  network: TypeNetwork;
  webChannel: TypeNetwork;
  dvdCountry: string | null;
  externals: TypeExternals;
  image: TypeImage;
  summary: string; // stringa contenente HTML
  updated: number; // timestamp UNIX in secondi
  _links: TypeLinks;
};

type TypeRating = {
  average: number;
};

export type TypePageShows = TypeShow[];

type TypeSchedule = {
  time: string; // formato orario "HH:mm"
  days: string[];
};

type TypeNetwork = {
  id: number;
  name: string;
  country: TypeCountry;
  officialSite: string | null;
};

type TypeCountry = {
  name: string;
  code: string;
  timezone: string;
};

type TypeExternals = {
  tvrage: number;
  thetvdb: number;
  imdb: string;
};

type TypeImage = {
  medium: string;
  original: string;
};

type TypeLinks = {
  self: TypeSelfLinks;
  previousepisode: TypeEpisode;
};

type TypeSelfLinks = {
  href: string;
};

type TypeEpisode = {
  href: string;
  name: string;
};

type TypeGenres = string[];

export type TypeEpisodes = {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: TypeRating;
  image: TypeImage;
  summary: string;
  _links: TypeLinks;
};

export type TypeShowEpisodes = TypeEpisodes[];
