import axios, { Method } from "axios";
import {
  CastOverview,
  Collection,
  CrewOverview,
  Movie,
  MovieCredits,
  MovieGenreList,
  MovieImages,
  MovieKeywordList,
  MovieLinks,
  MovieOverviewList,
  MovieRecommendationList,
  MovieReleaseList,
  MovieReviewList,
  MovieVideoList,
} from "../types/Movie";
import { KeywordList } from "../types/utils";
import { BASE_URL } from "./constants";
import { getHeaders } from "./getCredentials";

export const request = async <T = any>(
  url: string,
  method: Method = "GET",
  params?: any
) => {
  try {
    const { data } = await axios.request<T>({
      url: BASE_URL + url,
      method,
      params,
      headers: getHeaders(),
    });
    return data;
  } catch (err) {
    return null;
  }
};

type OverviewType =
  | "discover"
  | "trending"
  | "nowPlaying"
  | "popular"
  | "topRated"
  | "upcoming"
  | "search";

export const getMovieOverviews = async (type: OverviewType, params?: any) => {
  const typeUrlMap = {
    discover: "discover/movie",
    trending: "trending/movie/day",
    nowPlaying: "movie/now_playing",
    popular: "movie/popular",
    topRated: "movie/top_rated",
    upcoming: "movie/upcoming",
    search: "search/movie",
  };
  const data = await request<MovieOverviewList>(
    typeUrlMap[type],
    "GET",
    params
  );
  const overviews = data?.results || [];
  const totalPages = data?.total_pages;
  return {
    overviews,
    totalPages,
  };
};

export const getMovieVideos = async (id: string) => {
  const data = await request<MovieVideoList>(`movie/${id}/videos`);
  return data?.results.filter(({ site }) => site === "YouTube") || [];
};
export const getMovieLinks = async (id: string) => {
  const data = await request<MovieLinks>(`movie/${id}/external_ids`);
  return data;
};

export const getMovieImages = async (id: string) => {
  const data = await request<MovieImages>(`movie/${id}/images`);
  return data;
};

export const getMovieDetails = async (id: string) => {
  const data = await request<Movie>("movie/" + id);
  return data;
};

export const getMovieCredits = async (
  id: string
): Promise<{ cast: CastOverview[]; crew: CrewOverview[] }> => {
  const data = await request<MovieCredits>(`movie/${id}/credits`);
  if (!data) {
    return {
      cast: [],
      crew: [],
    };
  }

  const importantRoles = [
    "Story",
    "Characters",
    "Director",
    "Writer",
    "Novel",
    "Screenplay",
  ];

  const importantCrew = data.crew.filter((crew) =>
    importantRoles.includes(crew.job!)
  );

  const idCrewMap: Record<number, { name: string; jobs: string[] }> = {};
  for (const { id, name, job } of importantCrew) {
    if (id in idCrewMap) {
      idCrewMap[id] = {
        name: idCrewMap[id].name,
        jobs: [...idCrewMap[id].jobs, job],
      };
    } else {
      idCrewMap[id] = { name, jobs: [job] };
    }
  }
  const sortedCrew = Object.entries(idCrewMap)
    .map(([id, crew]) => ({
      id,
      ...crew,
      jobs: crew.jobs.sort(),
    }))
    .sort((x, y) => {
      if (x.jobs[0] < y.jobs[0]) {
        return -1;
      }
      if (x.jobs[0] > y.jobs[0]) {
        return 1;
      }
      return 0;
    });

  const directors = sortedCrew.filter((crewMember) =>
    crewMember.jobs.includes("Director")
  );
  const nonDirectors = sortedCrew.filter(
    (crewMember) => !crewMember.jobs.includes("Director")
  );
  const crew = [...directors, ...nonDirectors];

  const cast = data.cast.map(({ id, name, character, profile_path }) => ({
    id,
    name,
    character,
    profile_path,
  }));

  return {
    cast,
    crew,
  };
};

export const getMovieCredential = async (id: string) => {
  const data = await request<MovieReleaseList>(`movie/${id}/release_dates`);
  if (!data) {
    return null;
  }
  const americanReleaseDate = data.results
    .filter(({ iso_3166_1 }) => iso_3166_1 === "US")[0]
    ?.release_dates.filter(({ certification }) => certification);

  if (americanReleaseDate && americanReleaseDate.length) {
    return americanReleaseDate[0].certification;
  }
  const releaseDatesWCertification = data.results[0]?.release_dates.filter(
    ({ certification }) => certification
  );

  if (!releaseDatesWCertification?.length) {
    return "Unrated";
  }

  const credential = releaseDatesWCertification[0].certification;

  return credential;
};

export const getKeywords = async (id: string) => {
  const data = await request<MovieKeywordList>(`movie/${id}/keywords`);
  return data?.keywords;
};

export const getReviews = async (id: string) => {
  const data = await request<MovieReviewList>(`movie/${id}/reviews`);
  return data?.results || [];
};

export const getRecommendations = async (id: string) => {
  const data = await request<MovieRecommendationList>(
    `movie/${id}/recommendations`
  );
  return data?.results || [];
};

export const getCollection = async (id: string | null) => {
  if (!id) return null;
  const data = await request<Collection>(`collection/${id}`);
  return data;
};

export const getMovieGenres = async () => {
  const genres = (await request<MovieGenreList>("genre/movie/list"))?.genres;
  return genres;
};

export const searchKeywords = async (query: string) => {
  const data = await request<KeywordList>("search/keyword", "GET", { query });
  return data?.results || [];
};