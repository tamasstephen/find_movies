import React from "react";
import styles from "../styles/components/MovieCard.module.css";

interface Props {
  title: string;
  imgUrl: string;
  overview: string;
  score: number;
  fn: Function;
}

const MovieCard = ({ title, imgUrl, overview, score, fn }: Props) => {
  const imgSrc = imgUrl ? imgUrl : "/vercel.svg";
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
        <a onClick={() => fn(title, score, imgSrc)}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </a>
        <p className={styles.paragraph}>{overview}</p>
        <p>
          Rating: <span>{score}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
