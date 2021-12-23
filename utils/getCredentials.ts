export const token = process.env.NEXT_PUBLIC_TMDB_TOKEN;
export const getHeaders = () => ({
  Authorization: `Bearer ${token}`,
});
