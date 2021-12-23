import useAxios from "axios-hooks";
import { MovieOverviewList } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

type OverviewType = "discover" | "trending";

export const useMovieOverviews = (type: OverviewType) => {
  const typeUrlMap = {
    discover: "https://api.themoviedb.org/4/discover/movie",
    trending: "https://api.themoviedb.org/3/trending/movie/day",
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
