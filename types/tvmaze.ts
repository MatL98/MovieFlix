export type ShowImage = {
  medium?: string;
  original?: string;
};

export type ShowRating = {
  average: number | null;
};

export type Show = {
  id: number;
  name: string;
  summary: string | null;
  image: ShowImage | null;
  genres: string[];
  rating: ShowRating;
  premiered: string | null;
  url: string;
};

export type ShowSearchItem = {
  score: number;
  show: Show;
};
