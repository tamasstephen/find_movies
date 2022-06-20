import React from "react";
import styles from "../styles/components/MovieCard.module.css";
import Genres from "./Genres";
import { util } from "../utils/util";

interface Props {
  title: string;
  imgUrl: string;
  overview: string;
  genres: { name: string }[];
  score: number;
  movieId: number;
  fn: Function;
}

const MovieCard = ({
  title,
  imgUrl,
  overview,
  score,
  fn,
  movieId,
  genres,
}: Props) => {
  const imgSrc = imgUrl ? imgUrl : "/placeholder.png";
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.cardImg}
        src={imgSrc}
        alt={title}
        width={185}
        height={278}
      />
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>
          <a onClick={() => fn(title, score, imgSrc, movieId)}> {title}</a>
        </h3>
        <p className={styles.paragraph}>{util.shortenText(overview, 250)}</p>
        <p className={styles.rating}>
          Rating: <span>{score}</span>
        </p>
        <Genres genres={genres} />
      </div>
    </div>
  );
};

export default MovieCard;
