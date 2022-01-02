import { useCallback, useEffect, useRef, useState } from "react";
import { MovieOverview } from "../types/Movie";
import { getMovieOverviews } from "../utils/request";

export const useSortFilter = (movies: MovieOverview[]) => {
  const [allMovies, setAllMovies] = useState<MovieOverview[]>(movies);

  const paramsRef = useRef<any>({ page: 1 });
  const [sortBy, setSortBy] = useState("popularity.desc");

  const refreshMovies = useCallback(() => {
    paramsRef.current.page = 1;
    fetchMovies()
      .then((movies) => {
        console.log(movies.map((movie) => movie.original_title));
        return movies;
      })
      .then(setAllMovies);
  }, []);

  useEffect(() => {
    paramsRef.current.sort_by = sortBy;
    refreshMovies();
  }, [sortBy, refreshMovies]);

  const fetchMovies = () => {
    return getMovieOverviews("discover", paramsRef.current);
  };

  const loadMore = async () => {
    paramsRef.current.page++;
    const newMovies = await fetchMovies();
    setAllMovies((prevMovies) => [...prevMovies, ...newMovies]);
  };
  const [selectedGenreIds, setSelectedGenreIds] = useState<Set<number>>(
    new Set()
  );
  const handleToggleGenre = (genreId: number) => {
    if (selectedGenreIds.has(genreId)) {
      setSelectedGenreIds(
        new Set([...selectedGenreIds].filter((id) => id !== genreId))
      );
    } else {
      setSelectedGenreIds(new Set([...selectedGenreIds, genreId]));
    }
  };
  const clearGenres = () => setSelectedGenreIds(new Set());
  useEffect(() => {
    paramsRef.current.with_genres =
      [...selectedGenreIds].join(",") || undefined;
  }, [selectedGenreIds]);
  return {
    sortBy,
    setSortBy,
    selectedGenreIds,
    handleToggleGenre,
    refreshMovies,
    clearGenres,
    allMovies,
    loadMore,
  };
};
