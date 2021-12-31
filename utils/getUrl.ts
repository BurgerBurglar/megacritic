import {
  BACKDROP_PREFIX_LG,
  BACKDROP_PREFIX_SM,
  BACKDROP_PREFIX_WIDE,
  POSTER_PLACEHOLDER,
  POSTER_PREFIX_LG,
  POSTER_PREFIX_SM,
  PROFILE_PLACEHOLDER,
  PROFILE_PREFIX,
} from "./constants";

export const getPosterUrl = (
  path: string | null | undefined,
  size: "sm" | "lg" = "sm"
) => {
  if (!path) return POSTER_PLACEHOLDER;
  const sizeMap = {
    sm: POSTER_PREFIX_SM,
    lg: POSTER_PREFIX_LG,
  };
  const prefix = sizeMap[size];
  return prefix + path;
};

export const getBackdropUrl = (
  path: string | null | undefined,
  size: "sm" | "lg" | "wide" = "sm"
) => {
  if (!path) return POSTER_PLACEHOLDER;
  const sizeMap = {
    sm: BACKDROP_PREFIX_SM,
    lg: BACKDROP_PREFIX_LG,
    wide: BACKDROP_PREFIX_WIDE,
  };
  const prefix = sizeMap[size];
  return prefix + path;
};
export const getProfileUrl = (path: string | null | undefined) => {
  if (!path) return PROFILE_PLACEHOLDER;
  return PROFILE_PREFIX + path;
};
