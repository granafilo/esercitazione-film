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

export type TypeRating = {
  average: number | null;
};

export type TypePageShows = TypeShow[];

export type TypeSchedule = {
  time: string; // formato orario "HH:mm"
  days: string[];
};

export type TypeNetwork = {
  id: number;
  name: string;
  country: TypeCountry;
  officialSite: string | null;
};

export type TypeCountry = {
  name: string;
  code: string;
  timezone: string;
};

export type TypeExternals = {
  tvrage: number;
  thetvdb: number;
  imdb: string;
};

export type TypeImage = {
  medium: string;
  original: string;
};

export type TypeLinks = {
  self: TypeSelfLinks;
  previousepisode: TypeEpisode;
};

export type TypeSelfLinks = {
  href: string;
};

export type TypeEpisode = {
  href: string;
  name: string;
};

export type TypeGenres = string[];
