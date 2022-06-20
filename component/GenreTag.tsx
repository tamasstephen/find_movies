import React from "react";
import styles from "../styles/components/GenreTag.module.css";

interface Prop {
  genre: string;
}

const GenreTag = ({ genre }: Prop) => {
  return <p className={styles.tag}>{genre}</p>;
};

export default GenreTag;
