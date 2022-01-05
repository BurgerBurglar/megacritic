import { ParsedUrlQuery } from "querystring";

export const parseQuery = (query: ParsedUrlQuery, key: string) =>
  (JSON.stringify(query[key]) || "").replaceAll('"', "");
