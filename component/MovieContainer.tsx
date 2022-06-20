import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../model/Movie";
import styles from "../styles/components/MovieContainer.module.css";

interface Props {
  movies: Movie[];
  fn: Function;
}

const MovieContainer = ({ movies, fn }: Props) => {
  return (
    <div className={styles.cardContainer}>
      {movies.map((movie: Movie) => (
        <MovieCard
          title={movie.name}
          imgUrl={movie.img?.url}
          overview={movie.overview}
          score={movie.score}
          key={+movie.id}
          movieId={+movie.id}
          genres={movie.genres}
          fn={fn}
        />
      ))}
    </div>
  );
};

export default MovieContainer;
