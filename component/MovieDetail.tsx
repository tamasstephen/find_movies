import React, { useState } from "react";
import styles from "../styles/components/MovieDetails.module.css";

export interface Props {
  info: { content: string; wikiLink: string; imdbLink: string };
  title: string;
  imgSrc: string;
  score: number;
  visibility?: string;
  closeDetails: Function;
}

const MovieDetail = ({
  info,
  title,
  imgSrc,
  score,
  closeDetails,
  visibility,
}: Props) => {
  const detailContent = info.content !== "" ? info.content : "Not Available!";

  return (
    <div className={`${styles.details} ${visibility}`}>
      <a onClick={() => closeDetails()}>
        <p>Close</p>
      </a>
      <img src={imgSrc} alt={title} />
      <h2>{title}</h2>
      <p>{detailContent}</p>
      <p>Rating: {score}</p>
      <div>
        {info.imdbLink !== "" && (
          <a href={info.imdbLink} target="_blank" rel="noreferrer">
            <p>Imdb</p>
          </a>
        )}
        {info.wikiLink !== "" && (
          <a href={info.wikiLink} target="_blank" rel="noreferrer">
            <p>Wikipedia</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
