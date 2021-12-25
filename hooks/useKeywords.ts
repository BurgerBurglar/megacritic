import useAxios from "axios-hooks";
import { MovieKeywordList } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useKeywords = (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/keywords`;
  const [{ data, loading, error }, refetch] = useAxios<MovieKeywordList>({
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
  const keywords = data.keywords;
  return {
    keywords,
    loading,
    error,
    refetch,
  };
};
