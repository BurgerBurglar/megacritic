import useAxios from "axios-hooks";
import { MovieImages, MovieLinks } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useMovieLinks = (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/external_ids`;
  const [{ data, loading, error }, refetch] = useAxios<MovieLinks>({
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
    links: data,
    loading,
    error,
    refetch,
  };
};
