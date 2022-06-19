import React from "react";
import styles from "../styles/components/MovieDetails.module.css";

interface Props {
  info: { content: string; wikiLink: string; imdbLink: string; id: number };
  title: string;
  imgSrc: string;
  score: number;
  visibility?: string;
  closeDetails: Function;
  getRecommendedMovies: Function;
}

export interface DetailState {
  info: { content: string; wikiLink: string; imdbLink: string; id: number };
  title: string;
  imgSrc: string;
  score: number;
}

const MovieDetail = ({
  info,
  title,
  imgSrc,
  score,
  closeDetails,
  visibility,
  getRecommendedMovies,
}: Props) => {
  const detailContent = info.content !== "" ? info.content : "Not Available!";

  return (
    <div className={`${styles.details} ${visibility}`}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.close}>
            <p className={styles.closeLink}>
              <a onClick={() => closeDetails()}>Close</a>
            </p>
          </div>
          <img className={styles.detailImage} src={imgSrc} alt={title} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.paragraph}>{detailContent}</p>
          <div className={styles.extra}>
            <p className={styles.rating}>Rating: {score}</p>
          </div>
          <div className={`${styles.extra} ${styles.links}`}>
            {info.imdbLink !== "" && (
              <p>
                <a href={info.imdbLink} target="_blank" rel="noreferrer">
                  Imdb
                </a>
              </p>
            )}
            {info.wikiLink !== "" && (
              <p>
                <a href={info.wikiLink} target="_blank" rel="noreferrer">
                  Wikipedia
                </a>
              </p>
            )}

            <p>
              <a onClick={() => getRecommendedMovies(info.id)}>
                Related movies
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
