import React from "react";

interface Props {
  title: string;
  imgUrl: string;
  overview: string;
  score: number;
}

const MovieCard = ({ title, imgUrl, overview, score }: Props) => {
  function loadDetails() {
    console.log("details incoming");
  }

  const imgSrc = imgUrl ? imgUrl : "/vercel.svg";
  return (
    <div>
      <img src={imgSrc} alt={title} width={185} height={278} />
      <div>
        <a onClick={loadDetails}>
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
