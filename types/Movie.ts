export interface MovieOverviewList {
  page: number;
  results: MovieOverview[];
  total_pages: number;
  total_results: number;
}

export interface MovieOverview {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Staff {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  credit_id: string;
}

export interface Cast extends Staff {
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends Staff {
  department: Department;
  job: string;
}

export interface CastOverview {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewOverview {
  jobs: string[];
  name: string;
  id: string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Lighting = "Lighting",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export interface MovieReleaseList {
  id: number;
  results: MovieRelease[];
}

export interface MovieRelease {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: string | null;
  note: string;
  release_date: string;
  type: number;
}

export interface MovieKeywordList {
  id: number;
  keywords: MovieKeyword[];
}

export interface MovieKeyword {
  id: number;
  name: string;
}

export interface MovieImages {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
// Generated by https://quicktype.io

export interface MovieVideoList {
  id: number;
  results: MovieVideo[];
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieLinks {
  id: number;
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface MovieReviewList {
  id: number;
  page: number;
  results: MovieReview[];
  total_pages: number;
  total_results: number;
}

export interface MovieReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: null | string;
  rating: number | null;
}

export interface MovieRecommendationList {
  page: number;
  results: MovieRecommendation[];
  total_pages: number;
  total_results: number;
}

export interface MovieRecommendation {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieWatchProviderList {
  id: number;
  results: MovieWatchProviderMap;
}

export type MovieWatchProviderMap = Record<
  string,
  MovieWatchProvider1 & MovieWatchProvider2
>;

export interface MovieWatchProvider1 {
  link: string;
  rent: MovieWatchProviderDetail[];
  buy: MovieWatchProviderDetail[];
  flatrate?: MovieWatchProviderDetail[];
  free?: MovieWatchProviderDetail[];
  ads?: MovieWatchProviderDetail[];
}

export interface MovieWatchProvider2 {
  link: string;
  flatrate: MovieWatchProviderDetail[];
}

export interface MovieWatchProviderDetail {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: null;
  backdrop_path: string;
  parts: MovieOverview[];
}

export interface MovieGenreList {
  genres: MovieGenre[];
}

export interface MovieGenre {
  id: number;
  name: string;
}
