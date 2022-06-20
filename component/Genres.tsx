import React from "react";
import GenreTag from "./GenreTag";
import { util } from "../utils/util";
import styles from "../styles/components/Genres.module.css";

interface Props {
  genres: { name: string }[];
}

const Genres = ({ genres }: Props) => {
  return (
    <ul className={styles.container}>
      {genres.map((v) => (
        <li key={util.generateId()}>
          <GenreTag genre={v.name} />
        </li>
      ))}
    </ul>
  );
};

export default Genres;
