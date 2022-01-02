export interface DateRange {
  from?: Date;
  to: Date;
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
