export interface DateRange {
  from?: string;
  to?: string;
}

export interface KeywordList {
  page: number;
  results: Keyword[];
  total_pages: number;
  total_results: number;
}

export interface Keyword {
  id: number;
  name: string;
}


export type ColorScheme =
  | "purple"
  | "whiteAlpha"
  | "blackAlpha"
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "cyan"
  | "pink"
  | "linkedin"
  | "facebook"
  | "messenger"
  | "whatsapp"
  | "twitter"
  | "telegram";

export type shade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;