export interface Movie {
  id: string;
  name: string;
  overview: string;
  score: number;
  genres: { name: string }[];
  img: { url: string };
}
