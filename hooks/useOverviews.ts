import useAxios from "axios-hooks";
import { MovieOverviewList } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

type OverviewType =
  | "discover"
  | "trending"
  | "nowPlaying"
  | "popular"
  | "topRated"
  | "upcoming";

export const useMovieOverviews = (type: OverviewType) => {
  const typeUrlMap = {
    discover: "https://api.themoviedb.org/4/discover/movie",
    trending: "https://api.themoviedb.org/3/trending/movie/day",
    nowPlaying: "https://api.themoviedb.org/3/movie/now_playing",
    popular: "https://api.themoviedb.org/3/movie/popular",
    topRated: "https://api.themoviedb.org/3/movie/top_rated",
    upcoming: "https://api.themoviedb.org/3/movie/upcoming",
  };
  const [{ data, loading, error }, refetch] = useAxios<MovieOverviewList>({
    url: typeUrlMap[type],
    headers: getHeaders(),
  });
  return {
    movies: data?.results || [],
    loading,
    error,
    refetch,
  };
};
