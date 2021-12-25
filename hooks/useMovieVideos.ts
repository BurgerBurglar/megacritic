import useAxios from "axios-hooks";
import { MovieVideoList } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useMovieVideos = (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
  const [{ data, loading, error }, refetch] = useAxios<MovieVideoList>({
    url,
    headers: getHeaders(),
  });
  if (!data) {
    return {
      videos: undefined,
      loading,
      error,
      refetch,
    };
  }
  return {
    videos: data.results.filter(({ site }) => site === "YouTube"),
    loading,
    error,
    refetch,
  };
};
