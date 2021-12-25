import useAxios from "axios-hooks";
import { MovieImages } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useMovieImages = (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/images`;
  const [{ data, loading, error }, refetch] = useAxios<MovieImages>({
    url,
    headers: getHeaders(),
  });
  if (!data) {
    return {
      keywords: undefined,
      loading,
      error,
      refetch,
    };
  }
  return {
    images: data,
    loading,
    error,
    refetch,
  };
};
