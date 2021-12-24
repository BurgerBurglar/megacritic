import useAxios from "axios-hooks";
import { Movie } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useMovieDetails = (id: string) => {
  const url = "https://api.themoviedb.org/3/movie/" + id;
  const [{ data, loading, error }, refetch] = useAxios<Movie>({
    url,
    headers: getHeaders(),
  });
  return {
    movie: data,
    loading,
    error,
    refetch,
  };
};
