import { useCallback, useEffect, useRef, useState } from "react";
import { MovieOverview } from "../types/Movie";
import { DateRange } from "../types/utils";
import { getMovieOverviews } from "../utils/request";

export const useSortFilter = (movies: MovieOverview[]) => {
  const [allMovies, setAllMovies] = useState<MovieOverview[]>(movies);

  const paramsRef = useRef<any>({ page: 1 });
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [hasMore, setHasMore] = useState(true);

  const refreshMovies = useCallback(() => {
    paramsRef.current.page = 1;
    fetchMovies().then(({ overviews: newMovies }) => setAllMovies(newMovies));
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
    const { overviews: newMovies, totalPages } = await fetchMovies();
    setAllMovies((prevMovies) => [...prevMovies, ...newMovies]);
    if (paramsRef.current.page >= totalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
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

  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: new Date(),
  });

  useEffect(() => {
    paramsRef.current["primary_release_date.gte"] = dateRange.from;
    paramsRef.current["primary_release_date.lte"] = dateRange.to;
  }, [dateRange]);

  return {
    sortBy,
    setSortBy,
    selectedGenreIds,
    handleToggleGenre,
    refreshMovies,
    clearGenres,
    allMovies,
    loadMore,
    hasMore,
    dateRange,
    setDateRange,
  };
};
