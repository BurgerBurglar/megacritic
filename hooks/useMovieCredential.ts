import useAxios from "axios-hooks";
import { MovieReleaseList } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useMovieCredential = (id: string, productionCountry = "US") => {
  const url = `https://api.themoviedb.org/3/movie/${id}/release_dates`;
  const [{ data, loading, error }, refetch] = useAxios<MovieReleaseList>({
    url,
    headers: getHeaders(),
  });
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
