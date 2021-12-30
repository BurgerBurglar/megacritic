import { Method } from "axios";
import useAxios from "axios-hooks";
import {
  Movie,
  MovieCredits,
  MovieImages,
  MovieKeywordList,
  MovieLinks,
  MovieOverviewList,
  MovieRecommendationList,
  MovieReleaseList,
  MovieReviewList,
  MovieVideoList,
  MovieWatchProviderList,
} from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";
import { BASE_URL } from "../utils/constants";

export const useFetch = <T = any>(
  url: string,
  method: Method = "GET",
  params?: any
) => {
  const [{ data, loading, error }, refetch] = useAxios<T>({
    url: BASE_URL + url,
    method,
    params,
    headers: getHeaders(),
  });
  return { data, loading, error, refetch };
};

type OverviewType =
  | "discover"
  | "trending"
  | "nowPlaying"
  | "popular"
  | "topRated"
  | "upcoming";

export const useMovieOverviews = (type: OverviewType) => {
  const typeUrlMap = {
    discover: "discover/movie",
    trending: "trending/movie/day",
    nowPlaying: "movie/now_playing",
    popular: "movie/popular",
    topRated: "movie/top_rated",
    upcoming: "movie/upcoming",
  };
  const { data, loading, error, refetch } = useFetch<MovieOverviewList>(
    typeUrlMap[type]
  );
  return {
    movies: data?.results || [],
    loading,
    error,
    refetch,
  };
};

export const useMovieVideos = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieVideoList>(
    `movie/${id}/videos`
  );
  return {
    videos: data?.results.filter(({ site }) => site === "YouTube"),
    loading,
    error,
    refetch,
  };
};
export const useMovieLinks = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieLinks>(
    `movie/${id}/external_ids`
  );
  return {
    links: data,
    loading,
    error,
    refetch,
  };
};

export const useMovieImages = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieImages>(
    `movie/${id}/images`
  );
  return {
    images: data,
    loading,
    error,
    refetch,
  };
};

export const useMovieDetails = (id: string) => {
  const { data, loading, error, refetch } = useFetch<Movie>("movie/" + id);
  return {
    movie: data,
    loading,
    error,
    refetch,
  };
};

export const useMovieCredits = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieCredits>(
    `movie/${id}/credits`
  );
  if (!data) {
    return {
      credits: undefined,
      loading,
      error,
      refetch,
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
  const crew = Object.entries(idCrewMap)
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

  const cast = data.cast.map(({ id, name, character, profile_path }) => ({
    id,
    name,
    character,
    profile_path,
  }));

  return {
    cast,
    crew,
    loading,
    error,
    refetch,
  };
};

export const useMovieCredential = (id: string, productionCountry = "US") => {
  const { data, loading, error, refetch } = useFetch<MovieReleaseList>(
    `movie/${id}/release_dates`
  );
  if (!data) {
    return {
      credential: undefined,
      loading,
      error,
      refetch,
    };
  }
  // let credential = data.results
  //   .filter((result) => result.iso_3166_1 === productionCountry)[0]
  //   .release_dates.filter((result) => result.certification)[0].certification;
  const releaseDatesWCertification = data.results[0].release_dates.filter(
    (result) => result.certification
  );

  if (releaseDatesWCertification.length === 0) {
    return {
      credential: "Unrated",
      loading,
      error,
      refetch,
    };
  }

  const credential = releaseDatesWCertification[0].certification;

  return {
    credential,
    loading,
    error,
    refetch,
  };
};

export const useKeywords = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieKeywordList>(
    `movie/${id}/keywords`
  );
  return {
    keywords: data?.keywords,
    loading,
    error,
    refetch,
  };
};

export const useReviews = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieReviewList>(
    `movie/${id}/reviews`
  );
  return {
    reviews: data?.results || [],
    loading,
    error,
    refetch,
  };
};

export const useRecommendations = (id: string) => {
  const { data, loading, error, refetch } = useFetch<MovieRecommendationList>(
    `movie/${id}/recommendations`
  );
  return {
    recommendations: data?.results || [],
    loading,
    error,
    refetch,
  };
};

export const useWatchProviders = (id: string) => {
  // const { data, loading, error, refetch } = useFetch<MovieWatchProviderList>(
  //   `movie/${id}/watch/providers`
  // );
  const { data, loading, error, refetch } = useFetch<MovieRecommendationList>(
    `movie/${id}/recommendations`
  );
  console.log({ data });
  return {
    providers: data?.results || {},
    loading,
    error,
    refetch,
  };
};
