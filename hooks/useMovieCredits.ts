import useAxios from "axios-hooks";
import { MovieCredits } from "../types/Movie";
import { getHeaders } from "../utils/getCredentials";

export const useMovieCredits = (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
  const [{ data, loading, error }, refetch] = useAxios<MovieCredits>({
    url,
    headers: getHeaders(),
  });
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
  const credits = Object.entries(idCrewMap)
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
  return {
    credits,
    loading,
    error,
    refetch,
  };
};
