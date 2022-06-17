import React from "react";

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
    <div>
      <img src={imgSrc} alt={title} width={185} height={278} />
      <div>
        <a onClick={() => fn(title)}>
          <h3>{title}</h3>
        </a>
        <p>{overview}</p>
        <p>
          Rating: <span>{score}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
