import { useCallback, useEffect, useRef, useState } from "react";
import { MovieOverview } from "../types/Movie";
import { DateRange, Keyword } from "../types/utils";
import { stringifyDate } from "../utils/date";
import { getMovieOverviews } from "../utils/request";
import { useLocalStorage } from "./useLocalStorage";

export const useSortFilter = (movies: MovieOverview[]) => {
  const [allMovies, setAllMovies] = useState<MovieOverview[]>(movies);

  const paramsRef = useRef<any>({ page: 1 });
  const [sortBy, setSortBy] = useLocalStorage("sortBy", "popularity.desc");
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

  const [selectedGenreIds, setSelectedGenreIds] = useLocalStorage<number[]>(
    "genres",
    []
  );
  const handleToggleGenre = (genreId: number) => {
    if (selectedGenreIds.includes(genreId)) {
      setSelectedGenreIds([...selectedGenreIds].filter((id) => id !== genreId));
    } else {
      setSelectedGenreIds([...selectedGenreIds, genreId]);
    }
  };
  const clearGenres = () => setSelectedGenreIds([]);

  useEffect(() => {
    paramsRef.current.with_genres =
      [...selectedGenreIds].join(",") || undefined;
  }, [selectedGenreIds]);

  const [dateRange, setDateRange] = useLocalStorage<DateRange>("dateRange", {
    from: undefined,
    to: stringifyDate(new Date()),
  });

  useEffect(() => {
    paramsRef.current["primary_release_date.gte"] = dateRange.from;
    paramsRef.current["primary_release_date.lte"] = dateRange.to;
  }, [dateRange]);

  const [[minRating, maxRating], setRatings] = useLocalStorage(
    "ratings",
    [0, 10]
  );

  useEffect(() => {
    paramsRef.current["vote_average.gte"] = minRating || undefined;
    paramsRef.current["vote_average.lte"] = maxRating || undefined;
  }, [minRating, maxRating]);

  const [queries, setQueries] = useState<Keyword[]>([]);

  useEffect(() => {
    paramsRef.current.with_keywords = queries.map(({ id }) => id).join(",");
  }, [queries]);

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
    ratings: [minRating, maxRating] as [number, number],
    setRatings,
    queries,
    setQueries,
  };
};
