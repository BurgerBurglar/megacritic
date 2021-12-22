export const token = process.env.TMDB_TOKEN;
export const getHeaders = () => ({
  Authorization: `Bearer ${token}`,
});
